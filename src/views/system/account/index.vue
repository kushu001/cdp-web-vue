<template>
  <div>
    <cdp-table :table-config="tableConfig">
      <template v-slot:tableOperations="slotProps">
        <el-dropdown size="small" :hide-on-click="false" trigger="click">
          <el-button type="text" style="margin-left:10px" size="small">
            更 多<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="resetPassword(slotProps)">重置密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </cdp-table>
  </div>
</template>
<script>
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'
import { update } from '@/api/api'

export default {
  components: {
    CdpTable
  },
  data() {
    return {
      tableConfig: {
        title: '账户',
        url: '/api/v1/account',
        permissions: { 'add': ['system:account:add'], 'edit': ['system:account:edit'], 'view': ['system:account:view'], 'delete': ['system:account:delete'] },
        columns: [
          {
            name: 'username',
            type: 'input',
            label: '账号',
            formConfig: {
              rules: [{ required: true, message: '账号不能为空' }]
            }
          },
          {
            name: 'name',
            formConfig: {
              name: 'user_id',
              type: 'user-select-table',
              rules: [{ required: true, message: '请选择用户' }]
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
            name: 'enabled',
            label: '启用状态',
            type: 'switch',
            align: 'center',
            formConfig: {
              type: 'switch'
            },
            searchConfig: {
              type: 'select'
            },
            data: [
              { key: false, value: '禁用', type: 'info' },
              { key: true, value: '启用', type: 'success' }
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
        ]
      }
    }
  },
  methods: {
    resetPassword({ row }) {
      this.$confirm('重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        update({}, `/api/v1/account/password/${row.id}`).then(({ data }) => {
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
