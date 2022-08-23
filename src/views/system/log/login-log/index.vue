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
        url: '/api/v1/login-log',
        selection: false,
        tableOperations: [],
        columns: [
          {
            name: 'user',
            label: '登录人'
          },
          {
            name: 'address',
            label: '登录地',
            searchConfig: {
              hidden: true
            }
          },
          {
            name: 'client',
            label: '平台'
          },
          {
            name: 'os',
            label: '系统'
          },
          {
            name: 'ip',
            label: 'IP',
            searchConfig: {
              hidden: true
            }
          },
          {
            name: 'create_time',
            label: '登录时间'
          }
        ]
      }
    }
  }
}
</script>
