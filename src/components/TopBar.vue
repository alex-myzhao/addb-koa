<template>
  <div id="topbar">
    <el-dialog
      title="Bug Report"
      :visible.sync="bugReportDialogVisible"
    >
      <div class="bug-report-hint">
        Suggestions or bug descriptions:
      </div>
      <el-input
        type="textarea"
        v-model="description"
        :rows="5"
      />
      <span slot="footer">
        <el-button
          type="primary"
          @click="onClick('Submit')"
        >
          Submit
        </el-button>
        <el-button
          @click="onClick('Cancel')"
        >
          Cancel
        </el-button>
      </span>
    </el-dialog>

    <div
      class="menu-container addb-shadow-box"
    >
      <div id="topbar-welcome">{{ msg }}</div>
      <el-menu
        class="topbar-menu"
        mode="horizontal"
        default-active="1"
        @select="handleSelect"
      >
        <el-menu-item index="1"><i class="el-icon-menu"/>Home</el-menu-item>
        <el-menu-item v-show="canManage" index="2"><i class="el-icon-setting"/>Management</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-message"/>Bug Report</el-menu-item>
        <el-menu-item index="4"><i class="el-icon-close"/>Log Out</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import mailSender from '@/utils/mail-sender'

export default {
  name: 'TopBar',
  data () {
    return {
      bugReportDialogVisible: false,
      description: null
    }
  },
  computed: {
    canManage () {
      return this.$store.state.userInfo.authority === 1
    },
    msg () {
      return `Welcome, ${this.$store.state.userInfo.username}`
    }
  },
  methods: {
    onClick (buttonName) {
      const switchObj = {
        // send a bug report mail
        'Submit': () => {
          this.sendMail()
        },
        'Cancel': () => {
          this.bugReportDialogVisible = false
        }
      }
      if (switchObj[buttonName]) {
        switchObj[buttonName]()
      }
    },
    async sendMail () {
      try {
        if (!this.description || this.description.length < 10) {
          throw new Error('your descriptions are too short')
        }
        let res = await mailSender.bugReport(this.description)
        if (res.data.success) {
          this.$notify({
            title: 'Report Successfully',
            message: 'thank you for your feedback',
            type: 'success'
          })
        } else {
          throw new Error('connection lost')
        }
      } catch (err) {
        this.$notify({
          title: 'Report Failed',
          message: err.message,
          type: 'warning'
        })
      }
    },
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push('/home')
      } else if (key === '2') {
        this.$router.push('/manage')
      } else if (key === '3') {
        //  bug report
        this.bugReportDialogVisible = true
      } else if (key === '4') {
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

<style scoped>
#topbar {
  height: 62px;
  z-index: 100;
}

.menu-container {
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.topbar-menu {
  border-bottom: none;
}

#topbar-welcome {
  font-weight: bold;
  font-size: 1.5rem;
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
</style>
