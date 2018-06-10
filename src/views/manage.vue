<template>
<div id="manage">
  <TopBar id="top-menu" />
  <div id="manage-page-container">
    <el-tabs
      class="manage-tabs"
      type="card"
    >
      <el-tab-pane label="用户管理">
        <UserManage/>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <ConfigManage/>
      </el-tab-pane>
      <!-- <el-tab-pane label="操作日志">
        <SystemLog></SystemLog>
      </el-tab-pane> -->
      <el-tab-pane label="更新日志">
        <UpdateLog/>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import UserManage from '@/components/UserManage'
import ConfigManage from '@/components/ConfigManage'
import UpdateLog from '@/components/UpdateLog'
import TopBar from '@/components/TopBar'

export default {
  data () {
    return {}
  },
  components: {
    UserManage,
    ConfigManage,
    UpdateLog,
    TopBar
  }
}
</script>

<style>
#manage-page-container {
  position: relative;
  top: 20px;
}
</style>
