<template>
  <el-container direction="vertical">
    <cdp-search-form class="search-form" :columns="columns" :callback="onSearch" />
    <el-main>
      <el-row>
        <el-button-group v-if="!innerTableOperationConfig.append">
          <slot v-if="!innerRowOperationConfig.visible" />
          <slot v-else-if="innerRowOperationConfig.visible" name="tableOperation" />
        </el-button-group>
        <el-button-group v-if="innerTableOperationConfig.append">
          <el-button size="mini" type="success" icon="el-icon-plus" @click="addHandler()">新增</el-button>
          <el-button size="mini" type="primary" icon="el-icon-delete" @click="deleteMultiHandler()">批量删除</el-button>
          <slot v-if="!innerRowOperationConfig.visible" />
          <slot v-else-if="innerRowOperationConfig.visible" name="tableOperation" />
          <el-button size="mini" type="primary" icon="el-icon-bottom">导入</el-button>
          <el-button size="mini" type="primary" icon="el-icon-top">导出</el-button>
          <el-button size="mini" type="primary" plain icon="el-icon-document">导入模板</el-button>
        </el-button-group>
      </el-row>
      <el-row>
        <el-table :data="tableData" border @select="select" @select-all="selectAll">
          <el-table-column type="selection" width="55" />
          <el-table-column v-for="column in columns" :key="column.name" :align="column.align" :prop="column.name" :label="column.label" :width="column.width">
            <template slot-scope="scope">
              <span v-if="column.type!='select'" style="text-align: center;">{{ scope.row[column.name] }}</span>
              <span v-else-if="column.type=='select'" style="text-align: center;">
                <el-tag v-if="scope.row[column.name] && column.data.find(item=>item.key==scope.row[column.name]).type" size="medium" :type="column.data.find(item=>item.key==scope.row[column.name]).type">
                  {{ column.data.find(item=>item.key==scope.row[column.name]).value }}
                </el-tag>
                <span v-else-if="scope.row[column.name] && !column.data.find(item=>item.key==scope.row[column.name]).type">{{ column.data.find(item=>item.key==scope.row[column.name]).value }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <slot v-if="!innerRowOperationConfig.append && !innerTableOperationConfig.visible" />
              <slot v-else-if="!innerRowOperationConfig.append && innerTableOperationConfig.visible" name="rowOperation" />
              <template v-if="innerRowOperationConfig.append">
                <el-button type="text" size="small" @click="editHandler(scope)">
                  编辑
                </el-button>
                <el-button type="text" size="small" @click="deleteHandler(scope)">
                  删除
                </el-button>
                <slot v-if="!innerTableOperationConfig.visible" :scope="scope" />
                <slot v-else-if="innerTableOperationConfig.visible" :scope="scope" name="rowOperation" />
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
    <el-footer>
      <el-pagination :current-page.sync="currentPage" background layout="->, prev, pager, next, jumper, sizes, total" :total="listQuery.total" :page-size="10" :page-sizes="[10, 20, 30, 40]" @size-change="sizeChangeHandler" @current-change="currentChangeHandler" @prev-click="preClickHandler" @next-click="nextClickHandler" />
    </el-footer>
    <cdp-table-form :item="item" :dialog-form-visible.sync="dialogFormVisible" :columns="columns" :opt="opt" :title="title" :callback="callback" />
  </el-container>
</template>
<script>
import CdpSearchForm from '../components/cdp-search-form.vue'
import CdpTableForm from '../components/cdp-table-form.vue'
import { fetchList } from '@/api/api'
export default {
  components: {
    CdpSearchForm,
    CdpTableForm
  },
  props: {
    'columns': {
      type: Array,
      default: () => ([])
    },
    'data': {
      type: Array,
      default: () => ([])
    },
    'tableOptConfig': {
      type: Object,
      default: () => ({})
    },
    'rowOptConfig': {
      type: Object,
      default: () => ({})
    },
    'urls': {
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
      ids: [],
      item: {},
      opt: '新增',
      title: '',
      innerTableOperationConfig: {
        visible: true,
        append: true,
        ...this.tableOptConfig
      },
      innerRowOperationConfig: {
        visible: true,
        append: true,
        ...this.rowOptConfig
      },
      innerUrls: {
        addUrl: '',
        editUrl: '',
        queryUrl: '',
        ...this.urls
      },
      dialogFormVisible: false,
      currentPage: 1,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0
      },
      tableData: []
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
        this.tableData = [...response.data.data.records]
        this.listQuery.total = response.data.data.total
        this.loading = false
      })
    },
    onSearch(data) {
      console.log({ ...data })
      this.listQuery = { ...this.listQuery, ...data }
      this.getList(this.listQuery, this.url)
    },
    editHandler(scope) {
      this.item = { ...scope.row }
      this.opt = '编辑'
      this.dialogFormVisible = true
    },
    addHandler() {
      this.opt = '新增'
      this.dialogFormVisible = true
    },
    deleteHandler() {
      this.$confirm('确认删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteMultiHandler() {
      if (this.ids.length === 0) {
        this.$message({
          type: 'warning',
          message: '请勾选要删除的记录'
        })
        return
      }
      this.$confirm('确认删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    select(selection, row) {
      this.ids = selection.map(item => item.id)
      console.log(this.ids)
    },
    selectAll(selection) {
      this.ids = selection.map(item => item.id)
      console.log(this.ids)
    },
    callback(data) {
      if (Object.keys(data).length === 0) {
        console.log('add')
        // add(data, this.urls.addUrl).then(response => {

        // })
      } else {
        console.log('update')
        // update(data, this.urls.addUrl).then(response => {

        // })
      }
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
<style scoped>
.search-form {
  margin: 20px 20px 0 20px;
}
.el-main {
  padding-top: 0;
}
</style>
