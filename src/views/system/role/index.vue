<template>
  <cdp-table :table-config="tableConfig" />
</template>

<script>
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'

export default {
  name: 'Role',
  components: {
    CdpTable
  },
  data() {
    return {
      tableConfig: {
        title: '角色',
        url: '/api/v1/role',
        rOpn: {
          extra: [
            { name: 'Authorization', path: '/system/role/components' }
          ]
        },
        columns: [
          {
            name: 'name',
            type: 'input',
            label: '角色名称',
            defaultValue: '',
            formConfig: {
              rules: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
            }
          },
          {
            name: 'code',
            type: 'input',
            label: '角色编码',
            defaultValue: '',
            formConfig: {
              rules: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
            }
          },
          {
            name: 'enabled',
            label: '是否启用',
            align: 'center',
            formConfig: {
              type: 'switch'
            },
            searchConfig: {
              type: 'select'
            },
            render: ({ enabled }) => {
              return enabled ? <el-tag type='success' effect='dark'>启用</el-tag> : <el-tag type='info' effect='dark'>禁用</el-tag>
            },
            data: [
              { key: false, value: '禁用', type: 'info' },
              { key: true, value: '启用', type: 'success' }
            ]
          },
          {
            name: 'remark',
            label: '备注',
            formConfig: {
              type: 'textarea'
            },
            searchConfig: {
              hidden: true
            }
          }
        ]
      }
    }
  }
}
</script>
