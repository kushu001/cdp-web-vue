<template>
  <el-container>
    <el-main>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人" />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="姓名" sortable width="180" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="date" label="日期" sortable width="180" />
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
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
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
