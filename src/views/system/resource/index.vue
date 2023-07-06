<template>
  <cdp-table :table-config="tableConfig" />
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
            name: 'method',
            label: '请求方式',
            formConfig: {
              type: 'select',
              rules: [{ required: true, message: '请选择请求方式', trigger: 'blur' }]
            },
            searchConfig: {
              type: 'select'
            },
            data: async() => {
              let result = []
              const { data } = await fetchList({}, '/api/v1/dict/item/dict/QQFS')
              result = data.data.map(item => ({
                key: item['code'],
                value: item['name']
              }))
              return result
            }
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

