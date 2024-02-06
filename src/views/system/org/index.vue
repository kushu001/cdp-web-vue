<template>
  <div>
    <cdp-table :table-config="tableConfig" />
  </div>
</template>
<script>

import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'

export default {
  name: 'Org',
  components: {
    CdpTable
  },
  data() {
    return {
      tableConfig: {
        title: '部门',
        url: '/api/v1/org',
        pagination: false,
        hOpn: {
          default: [
            { name: 'AddButton' },
            { name: 'BatchDeleteButton' }
          ]
        },
        rOpn: {
          default: [
            { name: 'AddButton', path: '/system/org/components' },
            { name: 'ViewButton' },
            { name: 'EditButton' },
            { name: 'DeleteButton' }
          ]
        },
        columns: [
          {
            name: 'name',
            label: '公司/部门名称',
            formConfig: {
              rules: [{ required: true, message: '请输入公司/部门名称', trigger: 'blur' }]
            }
          },
          {
            name: 'code',
            label: '部门编码'
          },
          {
            name: 'manager',
            formConfig: {
              name: 'manager_id',
              type: 'user-select-table'
            },
            label: '部门负责人'
          },
          {
            name: 'create_time',
            label: '创建时间',
            formConfig: {
              hidden: true
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
