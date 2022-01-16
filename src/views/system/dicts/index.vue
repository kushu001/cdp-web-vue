<template>
  <el-container>
    <cdp-table :columns="columns" :data="data" />
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
      formInline: {},
      item: {},
      dialogEditFormVisible: false,
      opt: '新增',
      title: '字典',
      row: {},
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
          formHidden: true
        }
      ],
      data: [{
        id: 1,
        date: '2016-05-02',
        name: '管理员',
        code: '0001',
        status: 1
      }, {
        id: 2,
        date: '2016-05-04',
        name: '测试员',
        code: '0002',
        status: 2
      }, {
        id: 3,
        date: '2016-05-01',
        name: '测试员2',
        code: '0003',
        status: 1
      }, {
        id: 4,
        date: '2016-05-03',
        name: '测试员4',
        code: '0004',
        status: 4
      }]
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

