<template>
  <el-container>
    <table-area :data="data" :columns="columns" />
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
          name: 'date',
          type: 'date',
          label: '创建日期'
        }
      ],
      data: [{
        date: '2016-05-02',
        name: '管理员',
        code: '0001'
      }, {
        date: '2016-05-04',
        name: '测试员',
        code: '0002'
      }, {
        date: '2016-05-01',
         name: '测试员2',
         code: '0003'
      }, {
        date: '2016-05-03',
        name: '测试员4',
        code: '0003'
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
