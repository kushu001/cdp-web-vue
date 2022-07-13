<template>
  <div>
    <el-row>
      <cdp-search-region :conditions="columns" :search="searchHanlder" />
    </el-row>
    <el-row>
      <cdp-operation-region title="账号" :columns="columns" />
    </el-row>
    <el-row>
      <cdp-table-region ref="table" v-slot:default="slotProps" title="账号" :columns="columns" url="/api/v1/account">
        <el-dropdown size="small" :hide-on-click="false" trigger="click">
          <el-button type="text" style="margin-left:10px" size="small">
            更 多<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="resetPassword(slotProps)">重置密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </cdp-table-region>
    </el-row>
  </div>
</template>
<script>
import CdpSearchRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpSearchRegion'
import CdpOperationRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpOperationRegion'
import CdpTableRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion'
import { update } from '@/api/api'

export default {
  name: 'Account',
  components: {
    CdpSearchRegion,
    CdpOperationRegion,
    CdpTableRegion
  },
  data() {
    return {
      columns: [
        {
          name: 'username',
          type: 'input',
          label: '账号'
        },
        {
          name: 'name',
          formConfig: {
            name: 'user_id',
            type: 'select-table',
            key: 'id',
            value: 'name',
            filterable: true,
            url: '/api/v1/user'
          },
          label: '用户名'
        },
        {
          name: 'nickname',
          type: 'input',
          label: '昵称'
        },
        {
          name: 'role_name',
          formConfig: {
            name: 'role_ids',
            type: 'select',
            key: 'id',
            value: 'name',
            multiple: true,
            url: '/api/v1/role/all'
          },
          searchConfig: {
            hidden: true
          },
          label: '角色'
        },
        {
          name: 'status',
          type: 'select',
          label: '状态',
          align: 'center',
          formConfig: {
            type: 'select'
          },
          searchConfig: {
            type: 'select'
          },
          data: [
            { key: 1, value: '新建', type: 'success' },
            { key: 2, value: '进行中', type: 'info' },
            { key: 3, value: '通过', type: 'warning' },
            { key: 4, value: '拒绝', type: 'danger' }
          ]
        },
        {
          name: 'create_time',
          type: 'date',
          label: '创建时间',
          width: 180,
          formConfig: {
            type: 'date',
            hidden: true
          },
          searchConfig: {
            type: 'date',
            hidden: true
          }
        }
      ],
      gridData: [{
        name: '王小虎',
        dept: '信息部',
        posts: '经理'
      }, {
        name: '王小虎',
        dept: '财务部',
        posts: '财务总监'
      }, {
        name: '王小虎',
        dept: '生产部',
        posts: '生产经理'
      }, {
        name: '王小虎',
        dept: '仓库',
        posts: '仓库保管员'
      }],
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    test(slotProps) {
      console.log(slotProps.scope.row)
    },
    searchHanlder(form) {
      this.$refs.table.searchHandler(form)
    },
    bindUser(index, tableData) {
      console.log(index, tableData)
    },
    resetPassword(slotProps) {
      this.$confirm('重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        update({}, `/api/v1/account/password/${slotProps.scope.row.id}`).then(({ data }) => {
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '重置成功!'
            })
          } else {
            this.$message({
              type: 'danger',
              message: '重置失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    }
  }
}
</script>
<style>
/* .el-dropdown-link{
  color:#FF4949;
  margin-left: 10px;
  font-size: 10px;
} */
</style>
