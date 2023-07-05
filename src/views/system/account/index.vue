<template>
  <div>
    <cdp-table :table-config="tableConfig" />
  </div>
</template>
<script>
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'
import { fetchList } from '@/api/api'

export default {
  components: {
    CdpTable
  },
  data() {
    return {
      tableConfig: {
        title: '账户',
        url: '/api/v1/account',
        hOpn: {
          default: [
            { name: 'AddButton', permissions: ['system:account:add'] },
            { name: 'BatchDeleteButton' },
            { name: 'ImportButton' },
            { name: 'ExportButton' }
          ]
        },
        rOpn: {
          default: [
            { name: 'ViewButton', permissions: ['system:account:view'] },
            { name: 'EditButton', permissions: ['system:account:edit'] },
            { name: 'DeleteButton', permissions: ['system:account:delete'] },
            { name: 'ResetPassword', path: '/system/account/components', permissions: ['system:account:resetPassword'] }
          ]
        },
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
              multiple: true,
              rules: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
            },
            searchConfig: {
              name: 'role_ids',
              type: 'select',
              multiple: true
            },
            label: '角色',
            render: (record, value) => {
              return <div>
                {value.split(',').map((item, index) => {
                  return <el-tag type={['success', 'info', 'warning', 'danger'][index % 4]} style='margin: 3px 3px'>
                    {item}
                  </el-tag>
                }
                )}
              </div>
            },
            data: async() => {
              let result = []
              const { data } = await fetchList({}, '/api/v1/role/all')
              result = data.data.map(item => ({
                key: item['id'],
                value: item['name']
              }))
              // console.log(result)
              return result
            }
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
            render: ({ enabled }) => {
              return enabled ? <el-tag type='success' effect='dark'>启用</el-tag> : <el-tag type='info' effect='dark'>禁用</el-tag>
            },
            data: () => [
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
