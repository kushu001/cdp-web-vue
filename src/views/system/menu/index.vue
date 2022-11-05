<template>
  <el-container>
    <el-aside>
      <el-card>
        <cdp-search-tree placeholder="输入关键字进行过滤" :url="`${url}?v=${v}`" :default-expanded-keys="defaultKeys" :props="{label:'title'}" :accordion="true" :click-hanlder="clickHanlder" />
      </el-card>
    </el-aside>
    <el-main>
      <el-card>
        <div slot="header">
          <span>{{ (!isNew)? (form.title? form.title: '菜单信息'):parentTitle===''? (form.title? form.title: '菜单信息') : parentTitle+'-'+(form.title?form.title:'') }}</span>
          <el-button v-if="!isNew && form.type === '0'" style="float: right;" size="mini" type="success" plain @click="resetSubFormHandler">新建子级</el-button>
          <el-button v-if="!isNew" style="float: right;margin-right: 5px" size="mini" type="success" @click="resetFormHandler">新建</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="80px" style="padding-left:50px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="title">
                <el-input v-model="form.title" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="URL" prop="url">
                <el-input v-model="form.url" style="width:100%" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="类型" prop="type">
                <el-radio-group v-model="form.type" style="width:100%">
                  <el-radio :disabled="isNew && form.type === '1'" label="0">菜单</el-radio>
                  <el-radio label="1">操作</el-radio>
                  <el-radio label="2">接口</el-radio>
                  <!-- <el-radio v-if="Object.keys(data).length > 0" label="1">操作</el-radio> -->
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作标识" prop="permission">
                <el-input v-model="form.permission" style="width:100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否启用" prop="enabled">
                <el-switch v-model="form.enabled" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图标" prop="icon">
                <!-- <el-input v-model="form.icon" style="width:300px" /> -->
                <cdp-select-icon v-model="form.icon" style="width:100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="排序" prop="sort">
                <el-input-number v-model="form.sort" style="width:100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" type="textarea" style="width:100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-item>
              <el-button v-if="isNew" type="primary" @click="createMenuHandler">新 建</el-button>
              <el-button v-if="form.id" type="primary" @click="updateMenuHandler">更 新</el-button>
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
import CdpSelectIcon from '@/components/cdp-ui/CdpSelectIcon'

export default {
  components: {
    CdpSelectIcon,
    CdpSearchTree: resolve => require(['@/components/cdp-ui/CdpSearchTree'], resolve)
  },
  data() {
    return {
      form: { pid: 0, sort: 1, type: '0' },
      url: '/api/v1/menu',
      v: new Date().getTime(),
      // node: {},
      data: {},
      defaultKeys: [],
      isNew: true,
      parentTitle: ''
    }
  },
  methods: {
    createMenuHandler() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          add(this.form, this.url).then(response => {
            this.v = new Date().getTime()
            this.defaultKeys = [this.form.pid]
            this.$message({
              type: 'success',
              message: '新建成功'
            })
          })
        } else {
          console.log('error submit!!')
          this.$message({
            type: 'danger',
            message: '新建失败'
          })
          return false
        }
      })
    },
    updateMenuHandler() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          update(this.form, this.url).then(response => {
            this.v = new Date().getTime()
            this.defaultKeys = [this.form.id]
            this.$message({
              type: 'success',
              message: '更新成功'
            })
          })
        } else {
          console.log('error submit!!')
          this.$message({
            type: 'danger',
            message: '更新失败'
          })
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
              this.defaultKeys = [this.form.pid]
              this.$refs.form.resetFields()
              this.form = { ...this.form, id: undefined, type: '0' }
              this.isNew = true
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
    clickHanlder(data, node, isClicked) {
      // console.log(data)
      this.form = { ...data }
      this.isNew = !isClicked
      this.parentTitle = ''
    },
    resetFormHandler() {
      const type = this.form.type
      // console.log(type)
      this.$refs.form.resetFields()
      this.form = { ...this.form, id: undefined, type: type }
      this.isNew = true
      // console.log(this.form)
    },
    resetSubFormHandler() {
      this.parentTitle = this.form.title
      const type = this.form.type
      // console.log(type)
      this.$refs.form.resetFields()
      this.form = { ...this.form, id: undefined, pid: this.form.id, type: type }
      this.isNew = true
      // console.log(this.form)
    }
  }
}
</script>
