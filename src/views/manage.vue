<template>
<div id="manage">
  <TopBar id="top-menu"></TopBar>
  <div id="manage-page-container">
    <el-tabs class="manage-tabs" type="card">
      <el-tab-pane label="用户管理">
        <UserManage></UserManage>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <ConfigManage></ConfigManage>
      </el-tab-pane>
      <!-- <el-tab-pane label="操作日志">
        <SystemLog></SystemLog>
      </el-tab-pane> -->
      <el-tab-pane label="更新日志">
        <UpdateLog></UpdateLog>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import api from '../model/api.js'

let id = 1000;

export default {
  data() {
    return {}
  },
  components: {
    UserManage: require('../components/UserManage.vue'),
    ConfigManage: require('../components/ConfigManage.vue'),
    SystemLog: require('../components/SystemLog.vue'),
    UpdateLog: require('../components/UpdateLog.vue'),
    TopBar: require('../components/TopBar.vue')
  },
  methods: {}
}
</script>

<style>
#manage-page-container {
  position: relative;
  top: 20px;
}
</style>
