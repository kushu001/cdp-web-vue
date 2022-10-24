<template>
  <cdp-table :table-config="tableConfig" />
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
        title: '资源信息',
        url: '/api/v1/resource',
        columns: [
          {
            name: 'name',
            label: '资源名称',
            formConfig: {
              rules: [{ required: true, message: '请输入资源名称', trigger: 'blur' }]
            }
          },
          {
            name: 'sign',
            label: '标识',
            formConfig: {
              rules: [{ required: true, message: '请输入标识', trigger: 'blur' }]
            }
          },
          {
            name: 'url',
            label: 'URL',
            formConfig: {
              rules: [{ required: true, message: '请输入URL', trigger: 'blur' }]
            }
          },
          {
            name: 'create_time',
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
    }
  }
}
</script>

