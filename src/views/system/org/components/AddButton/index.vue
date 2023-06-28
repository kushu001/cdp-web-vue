<template>
  <span>
    <el-button type="text" style="margin-left:10px" size="small" @click="dialogFormHandler">新 增</el-button>
    <el-dialog title="新增子公司/部门" :visible.sync="dialogVisible" :append-to-body="true">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="公司/部门名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="部门代码" prop="code">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager_id">
          <cdp-user-select-table v-model="form.manager_id" style="width:183px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>
import CdpUserSelectTable from '@/views/components/cdp-user-select-table'
import { add } from '@/api/api'
export default {
  components: {
    CdpUserSelectTable
  },
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    refreshTable: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        code: '',
        manager_id: '',
        pid: 0
      },
      rules: {
        name: [{ required: true, message: '请输入公司/部门名称', trigger: 'blur' }],
        manager_id: [{ required: true, message: '请选择负责人' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((error, errrorInfo) => {
        if (!error) {
          return
        }
        add(this.form, '/api/v1/org').then(({ data }) => {
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '新建成功'
            })
            this.$refs.form.resetFields()
            this.refreshTable()
            this.dialogVisible = false
          } else {
            this.$message({
              type: 'danger',
              message: '新建失败'
            })
          }
        })
      })
    },
    dialogFormHandler() {
      this.dialogVisible = true
      this.form.pid = this.row.id
    }
  }
}
</script>
