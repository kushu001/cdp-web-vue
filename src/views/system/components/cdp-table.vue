<template>
  <el-container direction="vertical">
    <cdp-search-form class="search-form" :columns="columns" :callback="onSearch" />
    <el-main>
      <el-row v-if="innerTableOperationConfig.visible">
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
        <el-table :data="data" border @select="select" @select-all="selectAll">
          <el-table-column type="selection" width="55" />
          <el-table-column v-for="column in columns" :key="column.name" :align="column.align" :prop="column.name" :label="column.label" :width="column.width">
            <template slot-scope="scope">
              <span v-if="column.type!='select'" style="text-align: center;">{{ scope.row[column.name] }}</span>
              <span v-else-if="column.type=='select'" style="text-align: center;">
                <el-tag size="medium" :type="column.data.find(item=>item.key==scope.row[column.name]).type">
                  {{ column.data.find(item=>item.key==scope.row[column.name]).value }}
                </el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column v-if="innerRowOperationConfig.visible" fixed="right" label="操作" width="200">
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
    <cdp-table-form :item="item" :dialog-form-visible.sync="dialogFormVisible" :columns="columns" :opt="opt" :title="title" />
  </el-container>
</template>
<script>
import CdpSearchForm from '../components/cdp-search-form.vue'
import CdpTableForm from '../components/cdp-table-form.vue'
export default {
  components: {
    CdpSearchForm,
    CdpTableForm
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
        total: 101
      }
    }
  },
  methods: {
    onSearch(data) {
      console.log({ ...data })
    },
    editHandler(scope) {
      this.item = { ...scope.row }
      this.opt = '编辑'
      this.dialogFormVisible = true
    },
    addHandler() {
      this.opt = '新增'
      this.dialogFormVisible = true
      console.log(this.$refs.tag)
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
    sizeChangeHandler(pageSize) {
      console.log(`每页条数:${pageSize}`)
      this.listQuery.limit = pageSize
    },
    currentChangeHandler(currentPage) {
      console.log(`当前页:${currentPage}`)
      this.listQuery.page = currentPage
    },
    preClickHandler(currentPage) {
      console.log(`上一页:${currentPage}`)
      this.listQuery.page = currentPage
    },
    nextClickHandler(currentPage) {
      console.log(`下一页:${currentPage}`)
      this.listQuery.page = currentPage
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
