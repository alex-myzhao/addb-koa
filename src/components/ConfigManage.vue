<template>
  <div id="config-management">
    <el-row :gutter="20">
      <el-col :span="8">
        <ccpanel :optName="'reporterOptions'" :catagory="'basicDetail'"></ccpanel>
        <ccpanel :optName="'diseaseOptions'" :catagory="'basicDetail'"></ccpanel>
        <ccpanel :optName="'documentCategoryOptions'" :catagory="'basicDetail'"></ccpanel>
      </el-col>
      <el-col :span="8">
        <ccpanel :optName="'countryOptions'" :catagory="'basicDetail'"></ccpanel>
        <ccpanel :optName="'grSourceOptions'" :catagory="'locationDetail'"></ccpanel>
      </el-col>
      <el-col :span="8">
        <ccpanel :optName="'informationOptions'" :catagory="'diseaseDetail'"></ccpanel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import optionManager from '../model/optionManager.js'

export default {
  data() {
    return {
      operationType: null,
      reporterForm: [],
      operationForm: {
        reporter: null,
        newReporter: null
      }
    }
  },
  components: {
    ccpanel: require('./ConfigControlPanel.vue')
  },
  methods: {
    handleCurrentChange (val) {  //  记录当前选中的行
      this.currentRow = val
      if (this.currentRow !== null) {
        this.operationForm.reporter = val.reporter
      }
    },
    onDeleteReporter () {
      this.operationType = 'delete'
    },
    onAddReporter () {
      this.operationType = 'add'
    },
    onSubmit () {
      if (this.operationType === 'delete') {
        if (this.operationForm.reporter === null || this.operationForm.reporter === '') {
          this.$notify({ message: '请在左侧选中要删除的reporter', type: 'warning' })
          return
        }
        optionManager.deleteReporter(this.operationForm.reporter)
          .then((res) => {
            this.$notify({
              message: '删除成功', type: 'success'
            })
            this.getAllReporter()
            this.operationForm.reporter = null
          })
          .catch((err) => { this.$notify({ message: '网络错误', type: 'warning' }) })
      } else if (this.operationType === 'add') {
        if (this.operationForm.newReporter === null || this.operationForm.newReporter === '') {
          this.$notify({ message: '请在输入要添加的reporter', type: 'warning' })
          return
        }
        optionManager.addReporter(this.operationForm.newReporter)
          .then((res) => {
            this.$notify({
              message: '添加成功', type: 'success'
            })
            this.getAllReporter()
          })
          .catch((err) => { this.$notify({ message: '网络错误', type: 'warning' }) })
      }
    },
    getAllReporter () {
      optionManager.getReportOptions()
        .then((res) => {
          this.reporterForm = []
          for (let i in res.data.data) {
            this.reporterForm.push({
              reporter: res.data.data[i]
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getAllReporter()
  }
}
</script>

<style>
#config-management {
  margin-right: 10px;
}

#config-report-table {
  user-select: none;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

#config-manage-right-part {
  text-align: left;
}

#config-manage-reporter-form {
  margin-top: 10px;
}
</style>
