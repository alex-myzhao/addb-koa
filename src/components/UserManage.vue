<template>
<div id="user-management">
  <el-popover
    @show="operationType = 0"
    ref="popover" placement="top" width="160" v-model="visible">
    <el-input id="user-manage-input" v-model="username" placeholder="请输入要检索的用户名" size="small"
              @keyup.enter.native="onSearch"></el-input>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
    </div>
  </el-popover>

  <el-dialog title="管理员身份验证" v-model="dialogVisible" size="tiny">
    <el-input type="password" v-model="managerPassword" placeholder="请输入管理员密码"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </span>
  </el-dialog>

  <el-row :gutter="20">
    <el-col id="user-manage-left-part" :span="10">
      <el-table id="user-table" :data="userData" style="width: 100%" highlight-current-row
                align="center" @current-change="handleCurrentChange">
        <el-table-column property="id" type="index" width="50" sortable></el-table-column>
        <el-table-column property="username" label="Username" width="200" sortable></el-table-column>
        <el-table-column property="authority" label="Authority" sortable></el-table-column>
      </el-table>
    </el-col>
    <el-col :span="14" id="user-manage-right-part">
      <el-button-group>
        <el-button v-popover:popover>Search</el-button>
        <el-button @click="onModifyPassword">Reset Password</el-button>
        <el-button @click="onModifyAuthority">Modify Authority</el-button>
        <el-button @click="onDelete" icon="delete">Delete</el-button>
        <el-button @click="onNew" icon="plus">New User</el-button>
      </el-button-group>

      <el-form :inline="true" :model="operationForm" id="user-manage-operation-form"
                v-show="operationType !== 0">
        <el-form-item v-show="operationType !== 3">
          <el-input readonly v-model="operationForm.username" placeholder="请在左侧选中用户"></el-input>
        </el-form-item>
        <el-form-item v-show="operationType === 3">
          <el-input v-model="operationForm.newUsername" placeholder="请输入新用户名"></el-input>
        </el-form-item>
        <el-form-item v-show="operationType === 1 || operationType === 3">
          <el-input v-model="operationForm.password" placeholder="请输入新用户密码"></el-input>
        </el-form-item>
        <el-form-item v-show="operationType === 2 || operationType === 3">
          <el-select v-model="operationForm.authority" placeholder="请选择用户权限">
            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value"/>>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
import md5 from 'md5'

import manager from '../model/manager.js'

let authorityMap = [ 'Root', 'Administrator', 'Internal User', 'External User', 'Visiter' ]

export default {
  data() {
    return {
      options: [
        { label: 'Administrator', value: 1 },
        { label: 'Internal User', value: 2 },
        { label: 'External User', value: 3 },
        { label: 'Visiter', value: 4 }
      ],
      operationType: 0,
      operationHint: null,
      addOperation: false,
      operationForm: {
        username: '',
        newUsername: '',
        password: '',
        authority: ''
      },
      username: '',
      userData: [],
      visible: false,
      dialogVisible: false,
      managerPassword: '',
      currentRow: null
    }
  },
  methods: {
    onConfirm () {
      if (this.managerPassword.length === 0) {
        this.dialogVisible = false
        this.$notify({
          title: '操作失败',
          message: '管理员密码不能为空',
          type: 'warning'
        })
        return
      }
      switch (this.operationType) {
        case 1:  //  reset password
          manager.modifyPassword(this.operationForm.username, this.operationForm.password, {
            name: this.$store.state.userInfo.username,
            password: md5(this.managerPassword)
          })
          .then((res) => {
            if (res.data.success === true) { this.$notify({ title: '更新成功', message: '', type: 'success'}) }
            else { this.$notify({ title: '操作失败', message: '管理员密码错误', type: 'warning'}) }
          })
          .catch((err) => { this.$notify({ title: '操作失败', message: '', type: 'warning'}) })
          break
        case 2:  //  change authority
          manager.modifyAuthority(
            this.operationForm.username,
            parseInt(this.operationForm.authority), {
              name: this.$store.state.userInfo.username,
              password: md5(this.managerPassword)
          })
          .then((res) => {
            if (res.data.success === true) { this.$notify({ title: '更新成功', message: '', type: 'success'}) }
            else {   this.$notify({ title: '操作失败', message: '管理员密码错误', type: 'warning'}) }
            this.onSearch()
          })
          .catch((err) => { this.$notify({ title: '操作失败', message: '', type: 'warning'}) })
          break
        case 3:  //  add user
        manager.addUser(
          this.operationForm.newUsername,
          this.operationForm.password,
          parseInt(this.operationForm.authority), {
            name: this.$store.state.userInfo.username,
            password: md5(this.managerPassword)
          })
          .then((res) => {
            if (res.data.success === true) { this.$notify({ title: '添加成功', message: '', type: 'success'}) }
            else {   this.$notify({ title: '操作失败', message: '管理员密码错误', type: 'warning'}) }
            this.onSearch()
          })
          .catch((err) => { this.$notify({ title: '操作失败', message: '', type: 'warning'}) })
          break
        case 4:  //  delete user
        manager.deleteUser(
          this.operationForm.username, {
            name: this.$store.state.userInfo.username,
            password: md5(this.managerPassword)
          })
          .then((res) => {
            if (res.data.success === true) { this.$notify({ title: '删除成功', message: '', type: 'success'}) }
            else {   this.$notify({ title: '操作失败', message: '管理员密码错误', type: 'warning'}) }
            this.onSearch()
          })
          .catch((err) => { this.$notify({ title: '操作失败', message: '', type: 'warning'}) })
          break
      }
      this.dialogVisible = false
    },
    onSubmit () {
      if (this.validate()) {
        this.dialogVisible = true
      }
    },
    validate () {
      if (this.operationType !== 3) {
        if (this.operationForm.username === '') {
          this.$notify({ title: '', message: '请先选中需要操作的用户', type: 'warning' })
          return false
        }
      }
      switch (this.operationType) {
        case 1:
          if (this.operationForm.password === '') {
            this.$notify({ title: '', message: '新密码不能为空', type: 'warning' })
            return false
          }
          break
        case 2:
          if (this.operationForm.authority === '') {
            this.$notify({ title: '', message: '用户权限不能为空', type: 'warning' })
            return false
          }
          break
        case 3:
          if (this.operationForm.password === '' || this.operationForm.newUsername === '' ||
              this.operationForm.authority === '') {
            this.$notify({ title: '', message: '新用户的信息不完整', type: 'warning' })
            return false
          }
          break
        case 4:
          break
      }
      return true
    },
    onSearch () {
      this.userData = []
      this.visible = false
      if (this.username === '') {
        manager.searchAllUser()
          .then((res) => {
            let result = res.data.result
            for (let i in result) {
              this.userData.push({
                username: result[i].name,
                authority: authorityMap[parseInt(result[i].authority)]
              })
            }
          })
          .catch((err) => {
            //  do nothing
          })
      } else {
        manager.searchUser(this.username)
          .then((res) => {
            let result = res.data.result
            if (result.length === 0) {
              this.username = ''
              this.$notify({
                title: 'Not Found',
                message: '未查询到相应结果',
                type: 'warning'
              })
              this.onSearch()
            } else {
              for (let i in result) {
                this.userData.push({
                  username: result[i].name,
                  authority: authorityMap[parseInt(result[i].authority)]
                })
              }
            }
          })
          .catch((err) => {
            this.$notify({
              title: 'Not Found',
              message: '未查询到相应结果',
              type: 'warning'
            })
          })
      }
    },
    onModifyPassword () {
      this.operationType = 1
    },
    onModifyAuthority () {
      this.operationType = 2
    },
    onDelete () {
      this.operationType = 4
    },
    onNew () {
      this.operationType = 3
    },
    handleCurrentChange (val) {  //  记录当前选中的行
      this.currentRow = val
      if (this.currentRow !== null) {
        this.operationForm.username = val.username
      }
    }
  },
  created () {
    this.onSearch()
  }
}
</script>

<style>
#user-manage-input {
  margin-bottom: 5px;
}

#user-manage-right-part {
  text-align: left;
  height: 450px;
}

#user-manage-left-part {
  height: 450px;
  overflow: scroll;
}

#user-manage-operation-form {
  margin-top: 10px;
}

#user-table {
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}
</style>
