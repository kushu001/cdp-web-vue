<template>
  <div>
    <cdp-table :table-config="tableConfig">
      <template v-slot:operations="slotProps">
        <el-button type="primary" size="mini" icon="el-icon-delete">自定义扩展{{ slotProps.selectIds }}</el-button>
      </template>
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
export default {
  components: {
    CdpTable
  },
  data() {
    return {
      tableConfig: {
        title: '账户',
        url: '/api/v1/account',
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
        ]
      }
    }
  }
}
</script>
