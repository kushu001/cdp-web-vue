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
        url: '/api/v1/operate-log',
        columns: [
          {
            name: 'user',
            label: '操作人'
          },
          {
            name: 'url',
            label: '地址',
            searchConfig: {
              hidden: true
            }
          },
          {
            name: 'request_method',
            label: '请求方法'
          },
          {
            name: 'resource_name',
            label: '资源名称'
          },
          {
            name: 'payload',
            label: '载荷',
            searchConfig: {
              hidden: true
            }
          },
          {
            name: 'create_time',
            label: '操作时间'
          }
        ]
      }
    }
  }
}
</script>
