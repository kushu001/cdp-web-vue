<template>
  <el-container>
    <el-main>
      <el-form :inline="true" :model="formInline">
        <el-form-item v-for="column in columns" :key="column.name" :label="column.label">
          <el-input v-if="column.type=='input'" v-model="column.defaultValue" :name="column.name" :placeholder="`请输入${column.label}`" />
          <el-select v-if="column.type=='select'" v-model="formInline.region" :placeholder="`请选择${column.label}`">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
          <el-date-picker v-if="column.type=='date'" v-model="column.defaultValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="data" border style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="column in columns" :key="column.name" :prop="column.name" :label="column.label" :width="column.width" />
        <el-table-column fixed="right" label="操作" width="120">
          <template>
            <el-button type="text" size="small">
              编辑
            </el-button>
            <el-button type="text" size="small">
              删除
            </el-button>
            <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            编辑
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            删除
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination :current-page.sync="currentPage" background layout="->, prev, pager, next, jumper, sizes, total" :total="1000" :page-size="50" :page-sizes="[100, 200, 300, 400]" @size-change="sizeChangeHandler" @current-change="currentChangeHandler" @prev-click="preClickHandler" @next-click="nextClickHandler" />
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      currentPage:10,
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
