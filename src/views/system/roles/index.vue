<template>
  <el-container>
    <table-area url="/vue-element-admin/roles/list" :columns="columns" :title="title" :query="query">
      <template v-slot:operation>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" plain @click="onReset">重置</el-button>
          <el-button type="success" plain @click="dialogFormVisible=true,opt='新增'">新增</el-button>
          <el-button type="danger" plain>批量删除</el-button>
          <el-button type="danger" plain>导入</el-button>
          <el-button type="danger" plain>导出</el-button>
        </el-form-item>
      </template>
    </table-area>
    <!-- 弹窗 -->
    <table-form :ids="ids" :item="item" :dialog-form-visible.sync="dialogFormVisible" :columns="columns" :opt="opt" :title="title" />
  </el-container>
</template>
<script>
import TableArea from '../components/table-area'
import TableForm from '../components/table-form.vue'

export default {
  components: {
    TableArea,
    TableForm
  },
  data() {
    return {
      currentPage: 10,
      dialogFormVisible: false,
      formInline: {
        user: '',
        region: ''
      },
      query: {
        limit: 20
      },
      title: '角色',
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
          label: '创建日期',
          formHidden: true
        }
      ],
      data: [{
        id: 1,
        date: '2016-05-02',
        name: '管理员',
        code: '0001'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '测试员',
        code: '0002'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '测试员2',
        code: '0003'
      }, {
        id: 4,
        date: '2016-05-03',
        name: '测试员4',
        code: '0004'
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
