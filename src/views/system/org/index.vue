<template>
  <div>
    <el-row>
      <cdp-search-region :conditions="columns" />
    </el-row>
    <el-row>
      <cdp-operation-region title="公司/部门" :columns="columns" url="/api/v1/org" :operations="['add', 'import', 'export']" />
    </el-row>
    <el-row>
      <cdp-table-region v-slot:default="slotProps" title="公司/部门" :selection="false" :pagination="false" :columns="columns" url="/api/v1/org">
        <el-button type="text" style="margin-left:10px" size="small" @click="dialogFormHandler(slotProps)">新 增</el-button>
      </cdp-table-region>
      <el-dialog title="新增子公司/部门" :visible.sync="dialogVisible">
        <el-form ref="form" :inline="true" :model="form" label-width="120px">
          <el-form-item label="公司/部门名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="部门代码" prop="code">
            <el-input v-model="form.code" />
          </el-form-item>
          <el-form-item label="部门负责人" prop="manager">
            <el-input v-model="form.manager" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>
<script>
import { eventBus } from '@/components/cdp-ui/cdp-template/cdp-table/bus'
import CdpSearchRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpSearchRegion'
import CdpOperationRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpOperationRegion'
import CdpTableRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion'
import { add } from '@/api/api'
export default {
  name: 'Org',
  components: {
    CdpSearchRegion,
    CdpOperationRegion,
    CdpTableRegion
  },
  data() {
    return {
      title: '部门',
      form: {
        name: '',
        code: '',
        manager: '',
        pid: 0
      },
      dialogVisible: false,
      columns: [
        {
          name: 'name',
          label: '公司/部门名称'
        },
        {
          name: 'manager',
          formConfig: {
            name: 'manager_id',
            type: 'select',
            key: 'id',
            value: 'name',
            filterable: true,
            url: '/api/v1/user'
          },
          label: '部门负责人'
        },
        {
          name: 'date',
          label: '创建日期',
          formConfig: {
            hidden: true
          },
          searchConfig: {
            hidden: true
          }
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      add(this.form, '/api/v1/org').then(({ data }) => {
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '新建成功'
          })
          this.$refs.form.resetFields()
          this.dialogVisible = false
          eventBus.$emit('searchHandler', {})
        } else {
          this.$message({
            type: 'danger',
            message: '新建失败'
          })
        }
      })
      this.dialogVisible = false
    },
    dialogFormHandler(slotProps) {
      this.dialogVisible = true
      this.form.pid = slotProps.scope.row.id
    },
    sizeChangeHandler(pageSize) {
      console.log(`每页条数:${pageSize}`)
    },
    currentChangeHandler(currentPage) {
      console.log(`当前页:${currentPage}`)
    },
    preClickHandler(currentPage) {
      console.log(`上一页:${currentPage}`)
    },
    nextClickHandler(currentPage) {
      console.log(`下一页:${currentPage}`)
    }
  }
}
</script>
