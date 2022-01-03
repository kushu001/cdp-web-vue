<template>
  <el-container>
    <table-area url="/vue-element-admin/orgs/list" :columns="columns" :title="title" />
  </el-container>
</template>
<script>
import TableArea from '../components/table-area'

export default {
  components: {
    TableArea
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      title: '部门',
      columns: [
        {
          name: 'name',
          type: 'input',
          label: '公司/部门名称',
          width: 180,
          defaultValue: ''
        },
        {
          name: 'code',
          type: 'input',
          label: '部门代码',
          width: 180
        },
        {
          name: 'leader',
          type: 'input',
          label: '部门负责人'
        },
        {
          name: 'date',
          type: 'date',
          label: '创建日期',
          width: 180,
          formHidden: true
        }
      ],
      tableData: [{
        id: 1,
        date: '2016-05-02',
        leader: '王小虎',
        code: 'D0001',
        name: '部门一',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        leader: '王小虎',
        code: 'D0002',
        name: '部门二',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        leader: '王小虎',
        code: 'D0003',
        name: '部门三',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          leader: '王小虎',
          code: 'D0031',
          name: '部门四',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          leader: '王小虎',
          code: 'D0032',
          name: '部门五',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        leader: '王小虎',
        code: 'D0004',
        name: '部门六',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    onSubmit() {

    },
    sizeChangeHandler(pageSize) {
      console.log(`每页条数:${pageSize}`)
    },
    currentChangeHandler(currentPage) {
      console.log(`当前页:${currentPage}`)
    },
    preClickHandler(currentPage) {
      console.log(`上一页:${currentPage}`)
    },
    nextClickHandler(currentPage) {
      console.log(`下一页:${currentPage}`)
    }
  }
}
</script>
