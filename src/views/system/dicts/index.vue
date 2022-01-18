<template>
  <el-container>
    <cdp-table :columns="columns" url="/vue-element-admin/roles/list" />
  </el-container>
</template>

<script>
import CdpTable from '../components/cdp-table.vue'

export default {
  components: {
    CdpTable
  },
  data() {
    return {
      columns: [
        {
          name: 'name',
          type: 'input',
          label: '角色名称',
          defaultValue: ''
        },
        {
          name: 'code',
          type: 'input',
          label: '代码'
        },
        {
          name: 'status',
          type: 'select',
          label: '状态',
          align: 'center',
          data: [
            { key: 1, value: '新建', type: 'success' },
            { key: 2, value: '进行中', type: 'info' },
            { key: 3, value: '通过', type: 'warning' },
            { key: 4, value: '拒绝', type: 'danger' }
          ]
        },
        {
          name: 'date',
          type: 'date',
          label: '创建日期',
          searchHidden: true,
          formHidden: true
        }
      ]
    }
  },
  methods: {
    editHandler(scope) {
      this.item = { ...scope.row }
      this.dialogEditFormVisible = true
      console.log({ ...scope.row, test: '测试' })
    },
    test() {
      console.log('test')
    },
    dialog(scope) {
      this.dialogEditFormVisible = true
      this.row = { ...scope.row }
    }
  }
}
</script>

