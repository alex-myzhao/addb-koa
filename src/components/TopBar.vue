<template>
<div id="topbar">
  <el-dialog id="bug-report" title="Bug Report" v-model="bugReportShow" :modal="false"
             :close-on-click-modal="false">
    <div class="bug-report-hint">
      <div class="bug-desc">请您具体描述您所遇到的Bug，或对本系统的任何建议😅：</div>
      <div>出现在**哪个页面**，由于**何种操作导致**以及，最好能提供**导致出现bug的数据**</div>
    </div>
    <el-input type="textarea" v-model="description" :rows="5"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="bugReportShow = false">取 消</el-button>
      <el-button type="primary" @click="onSendMail">确 定</el-button>
    </span>
  </el-dialog>

  <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item id="topbar-welcome" index="5">{{ msg }}</el-menu-item>
    <el-menu-item index="1"><i class="el-icon-menu"></i>Home</el-menu-item>
    <el-menu-item v-show="canManage" index="2"><i class="el-icon-setting"></i>Management</el-menu-item>
    <el-menu-item index="3"><i class="el-icon-message"></i>Bug Report</el-menu-item>
    <el-menu-item index="4"><i class="el-icon-close"></i>Log Out</el-menu-item>
  </el-menu>
</div>
</template>

<script>
import mailSender from '../model/mailSender.js'

export default {
  data() {
    return {
      bugReportShow: false,
      description: null
    }
  },
  computed: {
    canManage () {
      return this.$store.state.userInfo.authority === 1
    },
    msg () {
      return 'Welcome, ' + this.$store.state.userInfo.username
    }
  },
  methods: {
    onSendMail () {
      this.bugReportShow = false
      if (this.description === null || this.description.length < 10) {
        this.$notify({
          message: '您的描述过于简短，为确保反馈质量请您填写更多信息',
          type: 'warning'
        })
        return
      }
      mailSender.bugReport(this.description)
        .then((res) => {
          console.log()
          if (res.data.success) {
            this.$notify({
              message: '感谢您的反馈～',
              type: 'success'
            })
          } else {
            this.$notify({ message: '网络错误', type: 'warning' })
          }
        })
        .catch((err) => {
          this.$notify({
            message: '网络错误',
            type: 'warning'
          })
        })
    },
    handleSelect (key, keyPath) {
      if (key == 1) {  // menu
        this.$router.push('/home')
      } else if (key == 2) {
        this.$router.push('/manage')
      } else if (key == 3) {
        //  bug report
        this.bugReportShow = true
      } else if (key == 4) {
        this.$store.commit('updateHomeConditionsBuff', {
          searchID: null, dValue: '', cValue: '', yValue: '', doubleClick: ''
        })
        this.$store.commit('updateHomeTableBuff', null)
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

h1 {
  text-align: center;
}

#topbar {
  height: 5vh;
  z-index: 100;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

#topbar-welcome {
  font-weight: bold;
  font-size: 18px;
  border: none;
}

#topbar-welcome:hover {
  border: none;
  cursor: default;
}

#topbar-welcome.el-menu-item.is-active {
  color: #000000;
}

.bug-report-hint {
  margin-bottom: 10px;
  text-align: left;
  color: #99A9BF;
}

.bug-desc {
  color: #000000;
}
</style>
