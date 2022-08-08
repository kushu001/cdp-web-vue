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
        title: '岗位信息',
        url: '/api/v1/post',
        columns: [
          {
            name: 'name',
            label: '岗位名称',
            formConfig: {
              rules: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }]
            }
          },
          {
            name: 'code',
            label: '岗位编码',
            formConfig: {
              rules: [{ required: true, message: '请输入岗位编码', trigger: 'blur' }]
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
  },
  methods: {
    searchHandler(form) {
      this.$refs.table.searchHandler(form)
    }
  }
}
</script>
<style scoped>
/* .page {
  padding: 20px;
} */
</style>

