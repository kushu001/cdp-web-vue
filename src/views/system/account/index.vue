<template>
  <div>
    <cdp-table :table-config="tableConfig" />
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
        rOpn: {
          extra: [
            { name: 'ResetPassword', path: 'system/account' }
          ]
        },
        permissions: { 'AddButton': ['system:account:add'], 'EditButton': ['system:account:edit'], 'ViewButton': ['system:account:view'], 'DeleteButton': ['system:account:delete'], 'ResetPassword': ['system:account:resetPassword'] },
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
              type: 'user-select-table'
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
            width: 250,
            formConfig: {
              name: 'role_ids',
              type: 'select',
              key: 'id',
              value: 'name',
              multiple: true,
              url: '/api/v1/role/all',
              rules: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
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
  }
}
</script>
