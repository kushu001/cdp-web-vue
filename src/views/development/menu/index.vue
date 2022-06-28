<template>
  <el-container>
    <el-aside>
      <el-card>
        <cdp-search-tree placeholder="输入关键字进行过滤" :url="`${url}?v=${v}`" :props="{label:'title'}" :click-hanlder="clickHanlder" />
      </el-card>
    </el-aside>
    <el-main>
      <el-card>
        <el-form ref="form" :inline="true" :model="form" label-width="80px" style="padding-left:50px">
          <el-form-item label="菜单名称">
            <el-input v-model="form.title" style="width:300px" />
          </el-form-item>
          <el-form-item label="URL">
            <el-input v-model="form.url" style="width:300px" />
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="form.type" style="width:300px">
              <el-radio label="0">菜单</el-radio>
              <el-radio label="1">操作</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="form.icon" style="width:300px" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="form.sort" style="width:300px" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" style="width:690px" />
          </el-form-item>
          <el-row type="flex" justify="center">
            <el-form-item>
              <el-button v-if="type !== '1' || !form.id" type="primary" @click="createMenuHandler">新 建</el-button>
              <el-button v-if="form.id" type="primary" @click="updateMenuHandler">修 改</el-button>
              <el-button v-if="form.id" type="primary" plain @click="deleteMenuHandler(form.id)">删 除</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
import { add, update, deleteById } from '@/api/api'

export default {
  components: {
    CdpSearchTree: resolve => require(['@/components/cdp-ui/CdpSearchTree'], resolve)
  },
  data() {
    return {
      form: { pid: 0, sort: 1 },
      url: '/api/v1/menu',
      v: new Date().getTime(),
      node: {},
      data: {},
      type: '1'
    }
  },
  methods: {
    createMenuHandler() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.pid = this.data.id ? this.data.id : this.form.pid
          add(this.form, this.url).then(response => {
            this.v = new Date().getTime()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateMenuHandler() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          debugger
          update(this.form, this.url).then(response => {
            this.v = new Date().getTime()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deleteMenuHandler(id) {
      if (id) {
        this.$confirm('确认删除记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById(`${this.url}/${id}`).then(({ data }) => {
            if (data.code === 200) {
              this.v = new Date().getTime()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'danger',
                message: '删除失败!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    clickHanlder(data, node) {
      this.form = { ...data }
      this.node = node
      this.data = data
      this.type = data.type
    }
  }
}
</script>
