<template>
<div id="login">
  <h1 id="login-title">Welcome to Disease DB</h1>
  <el-form
    :model="loginForm"
    :rules="loginRules"
    ref="loginForm"
    label-width="0px"
  >
    <div id="username-input">
      <el-form-item label="" prop="usernameInput">
        <el-input
          v-model="loginForm.usernameInput"
          @keyup.enter.native="login('loginForm')"
          size="large"
          placeholder="Username"
        />
      </el-form-item>
    </div>
    <div id="password-input">
      <el-form-item label="" prop="passwordInput">
        <el-input
          id="login-password-input"
          type="password"
          v-model="loginForm.passwordInput"
          @keyup.enter.native="login('loginForm')"
          size="large"
          placeholder="Password"
        />
      </el-form-item>
    </div>
    <el-form-item>
      <div id="login-button">
        <el-button
          id="login-login-btn"
          type="primary"
          @click="login('loginForm')"
        >
          Sign in
        </el-button>
        <el-button
          id="login-register-btn"
          @click="onRegister"
        >
          Sign up
        </el-button>
      </div>
    </el-form-item>
  </el-form>

  <el-dialog
    title="Sign Up"
    :visible.sync="dialogVisible"
  >
    <div id="login-dialog">
      <el-form
        :model="register"
        :rules="registerRules"
        ref="register"
        label-width="100px"
      >
        <el-form-item
          label="Username"
          prop="username"
        >
          <el-input
            class="register-input"
            v-model="register.username"
          />
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password">
          <el-input
            type="password"
            class="register-input"
            v-model="register.password"
          />
        </el-form-item>
        <el-form-item
          label="Comfirm"
          prop="confirm">
          <el-input
            type="password"
            class="register-input"
            v-model="register.confirm"
          />
        </el-form-item>
      </el-form>
    </div>
    <span
      slot="footer"
      class="dialog-footer">
      <el-button
        type="primary"
        @click="addUser('register')"
      >
        Sign up
      </el-button>
      <el-button
        @click="dialogVisible=false"
      >
        Cancel
      </el-button>
    </span>
  </el-dialog>

  <div id="login-info-container">
    <el-row>
      <span>
        {{ appName }}
      </span>
    </el-row>
    <el-row>
      <span>
        Version {{ version }}
      </span>
    </el-row>
  </div>
</div>
</template>

<script>
import api from '@/utils/api'
import mailSender from '@/utils/mail-sender'

import ClientConfig from '@/client-config'

export default {
  name: 'login',
  data () {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input your password'))
      } else {
        if (this.register.confirm !== '') {
          this.$refs.register.validateField('confirm')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please confirm your password'))
      } else if (value !== this.register.password) {
        callback(new Error('Please confirm your password'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      //  login
      loginForm: {
        usernameInput: '',
        passwordInput: ''
      },
      loginRules: {
        usernameInput: [
          { required: true, message: 'Please input your username', trigger: 'blur' }
        ],
        passwordInput: [
          { required: true, message: 'Please input your password', trigger: 'blur' }
        ]
      },
      //  register
      register: {
        userame: '',
        password: '',
        confirm: ''
      },
      registerRules: {
        username: [
          { required: true, message: 'Please input your username', trigger: 'blur' },
          { min: 8, max: 20, message: 'Username should be longer than 8 and shorter than 20 characters', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass1, trigger: 'blur' },
          { min: 8, max: 20, message: 'Password should be longer than 8 and shorter than 20 characters', trigger: 'blur' }
        ],
        confirm: [
          { validator: validatePass2, trigger: 'blur' }
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
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.loginForm.usernameInput, this.loginForm.passwordInput)
            .then((res) => {
              if (res.data.success) {
                // console.log(res.data)
                this.$store.commit('updateIslogin', true)
                this.$store.commit('updateUserInfo', {
                  authority: res.data.authority,
                  id: res.data.id,
                  username: res.data.username
                })
                this.$router.push('/home')
              } else {
                this.$notify({
                  title: 'Login Failed',
                  message: 'Wrong username or password',
                  type: 'warning'
                })
              }
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: '',
                message: 'Login Failed',
                type: 'Disconnected'
              })
            })
        } else {
          return false
        }
      })
    },
    onRegister () {
      this.dialogVisible = true
    },
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          api.register(this.register.username, this.register.password, 4)
            .then((res) => {
              if (res.data.success) {
                this.$notify({
                  title: '',
                  message: 'Register Successfully',
                  type: 'success'
                })
                return Promise.resolve()
              } else {
                this.$notify({
                  title: 'Register Failed',
                  message: 'Username already exists',
                  type: 'warning'
                })
                return Promise.reject(new Error('Username already exists'))
              }
            })
            .then(res => {
              mailSender.newUserReport(this.register.username)
                .then(res => {
                  // send a email
                })
                .catch(err => {
                  console.error(err)
                })
            })
            .catch((err) => {
              console.error(err)
              this.$notify({
                title: 'Register Failed',
                message: '',
                type: 'warning'
              })
            })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    }
  }
}
</script>

<style>
#login-title {
  font-size: 40px;
  margin-top: 15%;
  color: #FFFFFF;
  font-family: 'Hiragino Sans GB';
}

#login-login-btn {
  background-color: rgba(255, 255, 255, 0.2);
  border-style: none;
  width: 10%;
}

#login-login-btn:hover {
  background-color: rgba(184, 78, 52, 0.7);
}

#login-register-btn {
  background-color: rgba(255, 255, 255, 0.3);
  border-style: none;
  color: #FFFFFF;
  width: 10%;
}

#login-register-btn:hover {
  background-color: rgba(184, 78, 52, 0.7);
}

#login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('../assets/background1.jpg');
  background-size: cover;
}

#username-input {
  width: 35%;
  margin-left: auto;
  margin-right: auto;
  /*margin-bottom: 20px;*/
  font-family:'Helvetica Neue';
}

#password-input {
  width: 35%;
  margin-left: auto;
  margin-right: auto;
  font-family:'Helvetica Neue';
}

#login-button {
  width: 55%;
  margin-left: auto;
  margin-right: auto;
}

.hint {
  color: #99A9BF;
  text-align: right;
  position: absolute;
  right: 20px;
}

#login-info-container {
  text-align: left;
  font-family: 'Helvetica Neue';
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  left: 20px;
  bottom: 20px;
}
</style>
