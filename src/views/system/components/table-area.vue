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
          <el-button type="success" plain @click="dialogFormVisible=true">新增</el-button>
          <el-button type="danger" plain>批量删除</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="data" row-key="code" border style="width: 100%">
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
    <table-form :dialog-form-visible.sync="dialogFormVisible" />
    <el-footer>
      <el-pagination :current-page.sync="currentPage" background layout="->, prev, pager, next, jumper, sizes, total" :total="1000" :page-size="50" :page-sizes="[100, 200, 300, 400]" @size-change="sizeChangeHandler" @current-change="currentChangeHandler" @prev-click="preClickHandler" @next-click="nextClickHandler" />
    </el-footer>
  </el-container>
</template>

<script>
import TableForm from '../components/table-form.vue'
export default {
  components: {
    TableForm
  },
  props: {
    'columns': {
      type: Array,
      default: null
    },
    'data': {
      type: Array,
      default: null
    },
    'id': {
      type: String,
      default: null
    }
  },
  data() {
    return {
      currentPage: 1,
      formInline: {
      },
      dialogFormVisible: false
    }
  },
  methods: {
    onSubmit(data) {
      console.log(data)
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
