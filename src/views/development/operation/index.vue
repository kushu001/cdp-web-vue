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
        url: '/api/v1/operation',
        columns: [
          {
            name: 'name',
            label: '名称',
            width: 100,
            formConfig: {
              rules: [{ required: true, message: '请输入名称', trigger: 'blur' }]
            }
          },
          {
            name: 'code',
            label: '编码',
            width: 100,
            formConfig: {
              rules: [{ required: true, message: '请输入编码', trigger: 'blur' }]
            }
          },
          {
            name: 'path',
            label: '路径',
            formConfig: {
              rules: [{ required: true, message: '路径', trigger: 'blur' }]
            }
          },
          {
            name: 'group',
            label: '分组',
            width: 100,
            formConfig: {
              rules: [{ required: true, message: '请输入分组', trigger: 'blur' }]
            }
          },
          {
            name: 'level',
            label: '级别',
            width: 100,
            formConfig: {
              type: 'select',
              rules: [{ required: true, message: '请输入级别', trigger: 'blur' }]
            },
            render: ({ level }) => {
              switch (level) {
                case '1' : return <el-tag type='success' effect='dark'>系统级</el-tag>
                case '2' : return <el-tag type='info' effect='dark'>页面级</el-tag>
                default: return <el-tag type='info' effect='dark'>页面级</el-tag>
              }
            },
            data: [
              { key: '1', value: '系统级', type: 'success' },
              { key: '2', value: '页面级', type: 'info' }
            ]
          },
          {
            name: 'create_time',
            label: '创建时间',
            width: 150,
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

