<template>
<div id="update-log">
  <div id="update-log-version-hint">Current Version: {{ version }}</div>
  <div>
    <el-table :data="tableData" style="width: 100%" align="center" :show-header="showHead">
      <el-table-column prop="date" label="更新日期" width="180"></el-table-column>
      <el-table-column prop="content" label="更新内容"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import ClientConfig from '@/client-config'

export default {
  data () {
    return {
      tableData: [{
        date: '2018-02-03',
        content: '1.5.2 增添用户注册邮件提醒功能, 表格自适应'
      }, {
        date: '2017-04-17',
        content: '1.5.1 增添网络访问等待界面'
      }, {
        date: '2017-04-16',
        content: '1.5.0 限制home页面中初始化情况下查询的条目，默认最多显示100条'
      }, {
        date: '2017-04-12',
        content: 'Version 1.4.2 修改了在centos环境下运行可能产生的bug'
      }, {
        date: '2017-04-12',
        content: 'Version 1.4.1 添加了一些动效，提升用户体验'
      }, {
        date: '2017-04-11',
        content: 'Version 1.4.0 添加了更多条目的动态增删功能'
      }, {
        date: '2017-04-05',
        content: '修复了多用户同时进行批量导入时造成一个用户上传失败的错误'
      }, {
        date: '2017-04-01',
        content: 'Version 1.3.0 添加了Reporter管理功能，现在可以动态添加／删除reporter选项了'
      }, {
        date: '2017-04-01',
        content: '在顶栏上添加了用于反馈的按钮，可以通过此途径直接发送反馈信息给开发者'
      }, {
        date: '2017-03-31',
        content: '调整系统架构，修复了在添加下级条目时树状视图中不显示ID的问题'
      }, {
        date: '2017-03-30',
        content: '添加了用户管理功能'
      }, {
        date: '2017-03-29',
        content: '添加了更新日志；修复了manage页面访问控制的问题'
      }, {
        date: '2017-03-28',
        content: '主页的查询结果现在可以排序了'
      }, {
        date: '2017-03-27',
        content: '优化UI和UX，根据用户的权限不同，双击查询结果分别会进入编辑／查看界面'
      }, {
        date: '2017-03-27',
        content: '在导出按钮弹出的对话框中添加了get demo按钮，提供批量输入表格的样例下载'
      }, {
        date: '2017-03-25',
        content: '修复了服务端处理空值数据时的一些问题'
      }, {
        date: '2017-03-24',
        content: '更换了登录页面，优化外观'
      }, {
        date: '2017-03-20',
        content: '修复了录入表格页面中格式检查函数的一些bug；后端代码第一次重构'
      }, {
        date: '2017-03-19',
        content: '加入了用户权限属性：管理员，内部录入人员(可读写全部资料)，外部录入人员(可读写public)，访客(只读public)'
      }, {
        date: '2017-03-18',
        content: '提供了另一种批量导入功能'
      }, {
        date: '2017-03-17',
        content: '提供了第一种批量导入功能'
      }, {
        date: '2017-03-16',
        content: '完成批量导出功能'
      }, {
        date: '2017-03-14',
        content: '从别的页面返回home页面时，能够缓存之前查询结果；可以对查询结果进行多选和全选了'
      }, {
        date: '2017-03-13',
        content: '添加只读浏览功能，双击查询结果即可进入对应条目；添加了删除功能'
      }, {
        date: '2017-03-12',
        content: 'Version 0.9.0 完成数据库系统主体功能'
      }, {
        date: '..........',
        content: '..............'
      }],
      showHead: false
    }
  },
  computed: {
    version () {
      return ClientConfig.VERSION
    }
  }
}
</script>

<style>
#update-log {
  padding-top: 20px;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

#update-log-version-hint {
  text-align: left;
  font-family: 'Helvetica Neue';
  color: #99A9BF;
  margin-bottom: 10px;
  margin-left: 15px;
}
</style>
