<template>
<div id="home">
  <div id="home-page-container">
    <div class="search-condition-group">
      <el-input
        class="search-condition-items"
        placeholder="Report ID"
        v-model="conditions.searchID"
      />
      <el-select
        class="search-condition-items"
        v-model="conditions.dValue"
        placeholder="Disease"
        clearable
      >
        <el-option
          v-for="item in diseaseOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        class="search-condition-items"
        v-model="conditions.cValue"
        placeholder="Country"
        clearable
      >
        <el-option
          v-for="item in countryOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-date-picker
        class="search-condition-items"
        v-model="conditions.yValue"
        align="right"
        type="year"
        placeholder="Year"
      />
      <el-select
        class="search-condition-items"
        v-model="conditions.doubleClick"
        placeholder="Double Check"
        clearable
      >
        <el-option
          v-for="item in clickOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        circle
        @click="onSearch"
      />
      <el-button
        id="new-button"
        type="success"
        icon="el-icon-plus"
        circle
        @click="onNew"
        v-show="canEdit"
      />
      <el-popover
        placement="left"
        trigger="click"
      >
        <div>
          <el-button
            class="addb-default-button"
            type="success"
            icon="el-icon-download"
            @click="onBatchExport"
          >
            Export
          </el-button>
          <el-button
            class="addb-default-button"
            type="info"
            icon="el-icon-upload2"
            @click="onBatchInput"
            v-show="canEdit"
          >
            Import
          </el-button>
          <el-button
            class="addb-default-button"
            type="danger"
            icon="el-icon-delete"
            @click="onDelete"
            v-show="canEdit"
          >
            Delete
          </el-button>
        </div>
        <el-button
          slot="reference"
          icon="el-icon-menu"
          circle
        />
      </el-popover>
    </div>
    <div class="home-table-container">
      <el-table
        id="result-table"
        highlight-current-row
        align="center"
        tooltip-effect="light"
        stripe
        :data="tableData"
        v-loading="isLoading"
        element-loading-text="Searching"
        :default-sort = "{ prop: 'id', order: 'descending' }"
        @current-change="handleCurrentChange"
        @row-dblclick="doubleClickEvent"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          min-width="50"
          fixed
        />
        <el-table-column
          property="id"
          label="ID"
          min-width="60"
          sortable
        />
        <el-table-column
          property="title"
          label="Title"
          min-width="200"
          show-overflow-tooltip
          sortable
        />
        <el-table-column
          property="author"
          label="Author"
          min-width="140"
          show-overflow-tooltip
          sortable
        />
        <el-table-column
          property="disease"
          label="Disease"
          min-width="200"
          show-overflow-tooltip
          sortable
        />
        <el-table-column
          property="reporter"
          label="Reporter"
          min-width="140"
          show-overflow-tooltip
          sortable
        />
        <el-table-column
          property="time"
          label="Time"
          sortable
        />
      </el-table>
    </div>
  </div>

  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogUploadVisible"
    :close-on-click-modal="false"
    @close="onCloseDialog">
    <el-upload
      v-show="canUpload"
      class="upload-demo" drag
      :action="importUrl"
      name="report"
      :show-file-list="showlist"
      :on-success="onUploadSuccess"
      :data="payload"
      mutiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">{{ uploadHint }}</div>
    </el-upload>
    <div v-show="!canUpload">{{ uploadHint }}</div>
    <div id="upload-steps">
      <el-steps
        :space="110"
        :active="active"
        finish-status="success"
        :center="center"
      >
        <el-step
          v-for="i in 5"
          :key="i"
          :title="'Step ' + i"
        />
      </el-steps>
    </div>
    <div>
      <el-button
        id="download-demo"
        @click="downloadDemo"
        icon="arrow-down"
        type="primary"
      >
        Get Demo
      </el-button>
    </div>
  </el-dialog>
  <!--  用于为用户提供下载文档功能  -->
  <a id="getexcel" href=""></a>
  <a id="getdemo" href=""></a>
</div>
</template>

<script>
import api from '@/utils/api.js'
import ClientConfig from '@/client-config'
import TopBar from '@/components/TopBar'

export default {
  name: 'home',
  data () {
    return {
      //  download url
      importUrl: `//${ClientConfig.BASE_URL}/importexcel`,
      //  search conditions
      conditions: {
        searchID: null,
        dValue: '',
        cValue: '',
        yValue: '',
        doubleClick: ''
      },
      //  options
      diseaseOptions: [],
      countryOptions: [],
      clickOptions: ['Yes', 'No'],
      // table
      tableData: [],
      currentRow: null,
      isLoading: false,
      resultMultipleSelection: [],
      // dialog
      dialogUploadVisible: false,
      // upload
      showlist: false,
      // steps
      active: 0,
      center: true,
      hints: [ 'Basic Sources', 'Survey', 'Location', 'Disease', 'Intervention' ]
    }
  },
  components: {
    TopBar
  },
  computed: {
    helloMsg: function () {
      return 'Hello, ' + this.$store.state.userInfo.username
    },
    opt: {
      get () { return this.$store.state.opt },
      set (v) { this.$store.commit('updateOpt', v) }
    },
    editID: {
      get () { return this.$store.state.editID },
      set (v) { this.$store.commit('updateEditID', v) }
    },
    viewID: {
      get () { return this.$store.state.viewID },
      set (v) { this.$store.commit('updateViewID', v) }
    },
    dialogTitle: function () {
      if (this.active >= 5) {
        return 'Done~'
      }
      return 'Please Upload ' + this.hints[this.active]
    },
    uploadHint: function () {
      if (this.active >= 5) {
        return 'You can close this dialog now'
      }
      return this.hints[this.active] + ' file needed, .xls/.xlsx support only'
    },
    canUpload: function () {
      return this.active < 5
    },
    payload: function () {
      return {
        id: this.active,
        username: this.$store.state.userInfo.username
      }
    },
    canEdit: function () {
      return this.$store.state.userInfo.authority <= 3
    }
  },
  methods: {
    onClick (buttonName) {
      const switchObj = {}
      if (switchObj[buttonName]) {
        switchObj[buttonName]()
      }
    },
    isEmpty (ele) {
      return ele === undefined || ele === null || ele === ''
    },
    // dialog
    onCloseDialog () {
      this.onSearch()
    },
    // upload
    onUploadSuccess (response, file, fileList) {
      // console.log(response)
      if (!response.success) {
        this.dialogUploadVisible = false
        this.$alert('上传失败', '解析Excel时发生错误', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      }
      if (this.active++ > 4) {
        this.active = 0
      }
    },
    // table
    doubleClickEvent (row, e) {
      if (this.canEdit) {
        this.onEdit()
      } else {
        this.onView()
      }
    },
    handleCurrentChange (val) { // 记录当前选中的行
      this.currentRow = val
    },
    handleSelectionChange (val) { // 记录当前选中的所有行(多选)
      this.resultMultipleSelection = val
    },
    onBatchInput () {
      this.active = 0
      this.dialogUploadVisible = true
    },
    onBatchExport () {
      var ids = []
      for (let i in this.resultMultipleSelection) {
        ids.push(this.resultMultipleSelection[i].id)
      }
      if (ids.length === 0) {
        this.$alert('请在左侧框框中勾选您需要导出的条目', '未选中任何条目', {
          confirmButtonText: '确定',
          callback: action => {}
        })
        return
      }
      var url = `http://${ClientConfig.BASE_URL}/exportexcel?`
      // var url = 'http://' + this.$store.state.baseHost + ':3000/exportexcel?'
      for (let i in ids) {
        url += 'id' + i + '=' + ids[i]
        if (i !== ids.length - 1) {
          url += '&'
        }
      }
      var x = document.getElementById('getexcel')
      x.href = url
      x.click()
    },
    onView () {
      if (this.currentRow == null) {
        this.$alert('请选中需要查看的条目', '未选中任何条目',
          { confirmButtonText: '确定', callback: action => {} })
      } else {
        this.opt = 'view'
        this.viewID = this.currentRow.id
        this.$router.push('/detail')
      }
    },
    onEdit () {
      if (this.currentRow == null) {
        this.$alert('请选中需要编辑的条目', '未选中任何条目', {
          confirmButtonText: '确定',
          callback: action => {
            //  do nothing
          }
        })
      } else {
        this.opt = 'edit'
        this.editID = this.currentRow.id
        this.$router.push('/detail')
      }
    },
    onDelete () {
      var ids = []
      var confirmDeleteReports = ''
      for (let i in this.resultMultipleSelection) {
        ids.push(this.resultMultipleSelection[i].id)
        confirmDeleteReports += this.resultMultipleSelection[i].id + ' '
      }
      if (ids.length === 0) {
        this.$alert('请在左侧框框中勾选您需要删除的条目', '未选中任何条目', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        })
        return
      }
      this.$confirm('即将删除Report:  ' + confirmDeleteReports + ', 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          for (let i in ids) {
            api.delete.call(this, ids[i], 'Basic Sources')
          }
          this.onSearch()
        })
        .catch((err) => {
          //  donothing
          console.error(err)
        })
    },
    onNew () {
      this.opt = 'new'
      this.$router.push('/detail')
    },
    onSearch () {
      if (this.isEmpty(this.conditions.searchID) && this.isEmpty(this.conditions.dValue) &&
          this.isEmpty(this.conditions.cValue) && this.isEmpty(this.conditions.yValue) &&
          this.isEmpty(this.conditions.doubleClick)) {
        this.isLoading = true
        api.queryAll(this.authority, this)
        return
      }
      var that = this
      that.isLoading = true
      var yearArr = String(this.conditions.yValue).split(' ')
      api.query(this.conditions.searchID, {
        disease: this.conditions.dValue === '' ? null : this.conditions.dValue,
        country: this.conditions.cValue === '' ? null : this.conditions.cValue,
        year: this.conditions.yValue === '' ? null : parseInt(yearArr[3]),
        doubleClick: this.conditions.doubleClick === '' ? null : (this.conditions.doubleClick === 'Yes' ? 'Yes' : 'No')
      }, this.$store.state.userInfo.authority, that)
    },
    downloadDemo () {
      var url = 'http://' + this.$store.state.config.baseURL + '/exportdemo'
      var x = document.getElementById('getdemo')
      x.href = url
      x.click()
    }
  },
  created: function () {
    if (this.$store.state.options.options === null) {
      this.$store.dispatch('updateOpt')
        .then(() => {
          this.diseaseOptions = this.$store.getters.diseaseOptions
          this.countryOptions = this.$store.getters.countryOptions
        })
    } else {
      this.diseaseOptions = this.$store.getters.diseaseOptions
      this.countryOptions = this.$store.getters.countryOptions
    }

    if (this.$store.state.homeTableBuff !== null) {
      this.tableData = this.$store.state.homeTableBuff
      this.conditions.searchID = this.$store.state.homeConditionsBuff.searchID
      this.conditions.dValue = this.$store.state.homeConditionsBuff.dValue
      this.conditions.cValue = this.$store.state.homeConditionsBuff.cValue
      this.conditions.yValue = this.$store.state.homeConditionsBuff.yValue
      this.conditions.doubleClick = this.$store.state.homeConditionsBuff.doubleClick
    }
    this.onSearch()
  },
  beforeDestroy: function () {
    this.$store.commit('updateHomeTableBuff', this.tableData)
    this.$store.commit('updateHomeConditionsBuff', this.conditions)
  }
}
</script>

<style scoped>
#home {
  overflow: hidden;
}

#home-page-container {
  height: calc(95vh - 62px);
  margin-top: 1vh;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 1vh;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  text-align: left;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

#result-table {
  user-select: none;
  width: 100%;
}

#upload-steps {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}

.btn-container {
  text-align: right;
}

#download-demo {
  margin-top: 15px;
}

.search-condition-items {
  width: 16vw;
}

#new-button {
  margin-left: 0;
}

.home-table-container {
  margin-top: 0.5rem;
  height: calc(93vh - 100px);
  overflow: scroll;
}
.search-condition-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
