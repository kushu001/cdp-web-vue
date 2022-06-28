<template>
  <el-container>
    <el-main>
      <el-form ref="formInline" :inline="true" :model="formInline">
        <el-form-item v-for="column in columns" :key="column.name" :label="column.label" :prop="column.name">
          <el-input v-if="column.type=='input'" v-model="formInline[column.name]" :name="column.name" :placeholder="`请输入${column.label}`" />
          <el-select v-if="column.type=='select'" v-model="formInline.region" :placeholder="`请选择${column.label}`">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
          <el-date-picker v-if="column.type=='date'" v-model="formInline[column.name]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <slot name="operation">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" plain @click="onReset">重置</el-button>
            <el-button type="success" plain @click="dialogFormVisible=true,opt='新增'">新增</el-button>
            <el-button type="danger" plain>批量删除</el-button>
          </el-form-item>
        </slot>
      </el-form>
      <el-table v-loading="loading" :data="tableData" row-key="id" :tree-props="{ children: 'children', hasChildren: !'hasChildren' }" border style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="column in columns" :key="column.name" :prop="column.name" :label="column.label" :width="column.width" />
        <slot name="fixed-operation">
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editFormHandler(scope.row)">
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
        </slot>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination :current-page.sync="currentPage" background layout="->, prev, pager, next, jumper, sizes, total" :total="listQuery.total" :page-size="10" :page-sizes="[10, 20, 30, 40]" @size-change="sizeChangeHandler" @current-change="currentChangeHandler" @prev-click="preClickHandler" @next-click="nextClickHandler" />
    </el-footer>
    <!-- 弹窗 -->
    <table-form :ids="ids" :item="item" :dialog-form-visible.sync="dialogFormVisible" :columns="columns" :opt="opt" :title="title" />
  </el-container>
</template>

<script>
import TableForm from '../components/table-form.vue'
import { fetchList } from '@/api/api'

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
      default: () => ([])
    },
    'title': {
      type: String,
      default: null
    },
    'query': {
      type: Object,
      default: () => ({})
    },
    'url': {
      type: String,
      default: null
    }
  },
  data() {
    return {
      currentPage: 1,
      opt: '新增',
      formInline: {},
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0
      },
      ids: 1,
      item: {},
      tableData: [],
      loading: true
    }
  },
  created() {
    this.tableData = [...this.data]
    this.listQuery = {
      ...this.listQuery,
      ...this.query
    }
    if (this.tableData.length === 0 && this.url) {
      this.getList(this.listQuery, this.url)
    } else {
      this.loading = false
    }
  },
  methods: {
    getList(listQuery, url) {
      listQuery = {
        ...listQuery,
        ...this.formInline
      }
      fetchList(listQuery, url).then(response => {
        this.tableData = [...response.data.data.items]
        this.listQuery.total = response.data.data.total
        this.loading = false
      })
    },
    onSubmit(data) {
      console.log({ ...this.formInline })
      this.getList(this.listQuery, this.url)
    },
    onReset() {
      this.$refs.formInline.resetFields()
    },
    editFormHandler(row) {
      this.dialogFormVisible = true
      this.ids = row.id
      this.item = { ...row }
      this.opt = '修改'
    },
    sizeChangeHandler(pageSize) {
      console.log(`每页条数:${pageSize}`)
      this.listQuery.limit = pageSize
      this.getList(this.listQuery, this.url)
    },
    currentChangeHandler(currentPage) {
      console.log(`当前页:${currentPage}`)
      this.listQuery.page = currentPage
      this.getList(this.listQuery, this.url)
    },
    preClickHandler(currentPage) {
      console.log(`上一页:${currentPage}`)
      this.listQuery.page = currentPage
      this.getList(this.listQuery, this.url)
    },
    nextClickHandler(currentPage) {
      console.log(`下一页:${currentPage}`)
      this.listQuery.page = currentPage
      this.getList(this.listQuery, this.url)
    }
  }
}
</script>
