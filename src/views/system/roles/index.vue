<template>
  <el-container>
    <table-area />
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
      currentPage: 10,
      formInline: {
        user: '',
        region: ''
      },
      columns: [
        {
          name: 'account',
          type: 'input',
          label: '账号',
          width: 180,
          defaultValue: ''
        },
        {
          name: 'name',
          type: 'input',
          label: '姓名',
          width: 180
        },
        {
          name: 'address',
          type: 'input',
          label: '地址'
        },
        {
          name: 'date',
          type: 'date',
          label: '创建日期',
          width: 180
        }
      ],
      data: [{
        account: 'admin',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        account: 'admin',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        account: 'admin',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        account: 'admin',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    onSubmit(data) {
      console.log(data.target)
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
<style>

</style>
