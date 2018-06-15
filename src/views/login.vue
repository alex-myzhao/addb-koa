<template>
<div id="login">
  <div class="login-area-container addb-shadow-box">
    <h1 class="login-title">Welcome to Disease DB</h1>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
    >
      <el-form-item
        class="input-form-items"
        prop="loginUsername"
      >
        <el-input
          v-model="loginForm.loginUsername"
          @keyup.enter.native="login('loginForm')"
          placeholder="Username"
        />
      </el-form-item>
      <el-form-item
        class="input-form-items"
        prop="loginPassword"
      >
        <el-input
          v-model="loginForm.loginPassword"
          type="password"
          placeholder="Password"
          @keyup.enter.native="onClick('Login')"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          v-for="item in ['Login', 'Register']"
          :key="item"
          :type="item === 'Login' ? 'primary' : ''"
          @click="onClick(item)"
        >
          {{ item }}
        </el-button>
      </el-form-item>
    </el-form>
   </div>

  <el-dialog
    title="Sign Up"
    :visible.sync="registerDialogVisible"
  >
    <el-form
      :model="registerForm"
      :rules="registerRules"
      ref="registerForm"
      label-width="100px"
    >
      <el-form-item
        label="Username"
        prop="registerUsername"
      >
        <el-input
          v-model="registerForm.registerUsername"
        />
      </el-form-item>
      <el-form-item
        label="Password"
        prop="registerPassword"
      >
        <el-input
          type="password"
          v-model="registerForm.registerPassword"
        />
      </el-form-item>
      <el-form-item
        label="Comfirm"
        prop="registerConfirm"
      >
        <el-input
          type="password"
          v-model="registerForm.registerConfirm"
        />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button
        v-for="item in ['Submit', 'Cancel']"
        :key="item"
        :type="item === 'Submit' ? 'primary' : ''"
        @click="onClick(item)"
      >
        {{ item }}
      </el-button>
    </span>
  </el-dialog>

  <div id="login-app-info">
    <div>{{ appName }}</div>
    <div>Version {{ version }}</div>
  </div>
</div>
</template>

<script>
import mailSender from '@/utils/mail-sender'
import api from '@/utils/api'
import ClientConfig from '@/client-config'

export default {
  name: 'login',
  data () {
    let validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.registerForm.registerPassword) {
        callback(new Error('Please confirm your password'))
      } else {
        callback()
      }
    }
    return {
      //  login
      loginForm: {
        loginUsername: '',
        loginPassword: ''
      },
      loginRules: {
        loginUsername: [
          { required: true, message: 'Please input your username', trigger: 'blur' }
        ],
        loginPassword: [
          { required: true, message: 'Please input your password', trigger: 'blur' }
        ]
      },
      //  register
      registerDialogVisible: false,
      registerForm: {
        registerUsername: '',
        registerPassword: '',
        registerConfirm: ''
      },
      registerRules: {
        registerUsername: [
          { required: true, message: 'Please input your username', trigger: 'blur' },
          { min: 8, max: 20, message: 'Username should be longer than 8 and shorter than 20 characters', trigger: 'blur' }
        ],
        registerPassword: [
          { required: true, message: 'Please input your password', trigger: 'blur' },
          { min: 8, max: 20, message: 'Password should be longer than 8 and shorter than 20 characters', trigger: 'blur' }
        ],
        registerConfirm: [
          { required: true, message: 'Please confirm your password', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    version () {
      return ClientConfig.VERSION
    },
    appName () {
      return ClientConfig.APP_NAME
    }
  },
  methods: {
    onClick (buttonName) {
      const switchObj = {
        'Login': () => {
          this.submitForm('loginForm', this.login)
        },
        'Register': () => {
          this.registerDialogVisible = true
        },
        'Submit': () => {
          this.submitForm('registerForm', this.register)
        },
        'Cancel': () => {
          this.registerDialogVisible = false
        }
      }
      if (switchObj[buttonName]) {
        switchObj[buttonName]()
      }
    },
    submitForm (formName, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback()
        }
      })
    },
    async login () {
      try {
        let res = await api.login(this.loginForm.loginUsername, this.loginForm.loginPassword)
        if (res.data.success) {
          this.$store.commit('updateIslogin', true)
          this.$store.commit('updateUserInfo', {
            authority: res.data.authority,
            id: res.data.id,
            username: res.data.username
          })
          this.$router.push('/home')
        } else {
          throw new Error('wrong username or password')
        }
      } catch (err) {
        this.$notify({
          title: 'Login Failed',
          message: err.message,
          type: 'warning'
        })
      }
    },
    async register () {
      this.registerDialogVisible = false
      try {
        let res = await api.register(this.registerForm.registerUsername, this.registerForm.registerPassword, 4)
        if (res.data.success) {
          this.$notify({
            title: 'Register Successfully',
            message: `the user ${this.registerForm.registerUsername} has been registered`,
            type: 'success'
          })
        } else {
          throw new Error('username already exists')
        }
      } catch (err) {
        this.$notify({
          title: 'Register Failed',
          message: err ? err.message : 'connection lost',
          type: 'warning'
        })
      }
      // send mail
      try {
        await mailSender.newUserReport(this.register.username)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
#login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  /* background-image: url('../assets/background1.jpg');
  background-size: cover; */
}

.login-area-container {
  margin-top: calc(50vh - 200px);
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 70%;
  transition: .2s;
}

.login-title {
  font-size: 2.5rem;
  color: #442D2B;
}

.input-form-items {
  width: 65%;
  margin-left: auto;
  margin-right: auto;
}

.hint {
  color: #99A9BF;
  text-align: right;
  position: absolute;
  right: 20px;
}

#login-app-info {
  text-align: left;
  position: absolute;
  color: rgba(0, 0, 0, 0.5);
  left: 20px;
  bottom: 20px;
}
</style>
