<template>
<div class="control-panel">
  <el-row class="cc-title">
    <span>{{ optName }}</span>
    <el-button class="cc-fold-btn" type="text"
      :icon="!visiable ? 'arrow-down' : 'arrow-up'" @click="onUnfold"></el-button>
  </el-row>
  <transition name="slide-fade" mode="out-in">
    <div v-show="visiable">
      <el-button-group class="cc-button-group">
        <el-button class="cc-button-group-item" @click="onDelete" icon="delete">Delete</el-button>
        <el-button class="cc-button-group-item" @click="onAdd" icon="plus">New Item</el-button>
      </el-button-group>
      <el-form class="cc-inline-form" :inline="true" :model="form">
        <el-form-item class="cc-inline-form-item" v-show="type === 'delete'">
          <el-input readonly v-model="form.deleteItem" placeholder="请在选中要删除的条目"></el-input>
        </el-form-item>
        <el-form-item class="cc-inline-form-item" v-show="type === 'add'">
          <el-input v-model="form.addItem" placeholder="请输入要添加的条目"></el-input>
        </el-form-item>
        <el-form-item class="cc-inline-form-item cc-inline-form-submit" v-show="type !== null">
          <el-button type="text" @click="onSubmit">确定</el-button>
          <el-button type="text" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-table :data="dataForm" style="width: 100%" highlight-current-row
                  align="center" @current-change="handleCurrentChange">
          <el-table-column property="id" type="index" width="100"></el-table-column>
          <el-table-column property="value" :label="optName" sortable></el-table-column>
        </el-table>
      </el-row>
    </div>
  </transition>
</div>
</template>

<script>
import optionManager from '../model/optionManager'

export default {
  data() {
    return {
      visiable: false,
      type: null,
      form: {
        deleteItem: null,
        addItem: null
      },
      dataForm: []
    }
  },
  //  'reporter' 'disease' 'country' 'documentCategory' 'grSource' 'information'
  props: ['optName', 'catagory'],
  methods: {
    handleCurrentChange (val) {
      this.currentRow = val
      if (this.currentRow !== null) {
        this.form.deleteItem = val.value
      }
    },
    onDelete () {
      this.type = 'delete'
    },
    onAdd () {
      this.type = 'add'
    },
    onSubmit () {
      if (this.type == 'delete') {
        if (this.form.deleteItem === null || this.form.deleteItem === '') {
          this.$notify({ message: '请在左侧选中要删除的条目', type: 'warning' })
          return
        }
        optionManager.deleteOptions(this.catagory, this.optName, this.form.deleteItem)
          .then((res) => {
            this.$notify({ message: '删除成功', type: 'success' })
            this.$store.dispatch('updateOpt')
              .then(() => {
                this.update()
              })
          })
          .catch((err) => { this.$notify({ message: '网络错误', type: 'warning' }) })
      } else if (this.type = 'add') {
        if (this.form.addItem === null || this.form.addItem === '') {
          this.$notify({ message: '请在输入要添加的条目', type: 'warning' })
          return
        }
        optionManager.addOptions(this.catagory, this.optName, this.form.addItem)
          .then((res) => {
            this.$notify({ message: '添加成功', type: 'success' })
            this.$store.dispatch('updateOpt')
              .then(() => {
                this.update()
              })
          })
          .catch((err) => { this.$notify({ message: '网络错误', type: 'warning' }) })
      }

      this.type = null
      this.form = {
        deleteItem: null,
        addItem: null
      }
    },
    onCancel () {
      this.type = null
      this.form = {
        deleteItem: null,
        addItem: null
      }
    },
    onUnfold () {
      this.visiable = !this.visiable
    },
    update () {
      this.dataForm = []
      let tmp = this.$store.getters[this.optName]
      for (let i in tmp) {
        this.dataForm.push({
          value: tmp[i]
        })
      }
    }
  },
  created () {
    this.update()
  }
}
</script>

<style>
.control-panel {
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  user-select: none;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.cc-title {
  font-size: 18px;
  /*font-weight: bold;*/
  border-bottom-style: solid;
  border-bottom-color: #d1dbe5;
  border-bottom-width: 1px;
  padding: 10px 10px 8px 12px;
}

.cc-fold-btn {
  position: absolute;
  top: 5px;
  right: 10px;
}

.cc-button-group {
  width: 100%;
}

.cc-button-group-item {
  height: 45px;
  width: 50%;
  border-style: none;
}

.cc-inline-form {
  width: 100%;
  text-align: center;
  margin: 0;
}

.cc-inline-form-item {
  margin-bottom: 10px;
  border-style: none;
}

.cc-inline-form-submit {
  position: relative;
  right: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s ease;
}

.slide-fade-enter, .slide-fade-leave-active {
  transform: translateY(-40px);
  opacity: 0;
}
</style>
