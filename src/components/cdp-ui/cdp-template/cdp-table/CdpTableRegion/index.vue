<template>
  <div style="margin:0 20px">
    <el-table :data="tableData" border row-key="id" @select="select" @select-all="selectAll">
      <el-table-column v-if="selection && pagination" type="selection" width="55" />
      <!-- <el-table-column type="index" :index="calIndex"></el-table-column> -->
      <el-table-column v-for="column in columns" :key="column.name" :align="column.align" :prop="column.name" :label="column.label" :width="column.width">
        <template slot-scope="scope">
          <!-- <el-tag v-if="scope.row[column.name] && column.data && column.data.find(item=>item.key==scope.row[column.name]) && column.data.find(item=>item.key==scope.row[column.name]).type" size="medium" :type="column.data.find(item=>item.key==scope.row[column.name]).type">
            {{ column.data.find(item=>item.key==scope.row[column.name]).value }}
          </el-tag> -->
          <!-- <span v-else>{{ scope.row[column.name] }}</span> -->
          <span v-if="column.type=='select'">
            <span v-if="!column.formConfig.multiple">
              <el-tag size="medium" :type="column.data.find(item=>item.key==scope.row[column.name]).type" effect="plain">
                {{ column.data.find(item=>item.key==scope.row[column.name]).value }}
              </el-tag>
            </span>
            <span v-else-if="scope.row[column.name] != null && scope.row[column.name] != ''">
              <el-tag v-for="(item, index) in scope.row[column.name].split(',')" :key="index" :type="['success','info','warning','danger'][index % 4]" style="margin: 3px 3px">
                {{ item }}
              </el-tag>
            </span>
            <span v-else>
              {{ scope.row[column.name] }}
            </span>
          </span>
          <span v-else-if="column.type=='switch'">
            <el-tag v-if="scope.row[column.name]" :type="column.data.find(item=>item.key).type" effect="dark">{{ column.data.find(item=>item.key).value }}</el-tag>
            <el-tag v-else-if="!scope.row[column.name]" :type="column.data.find(item=>!item.key).type" effect="dark">{{ column.data.find(item=>!item.key).value }}</el-tag>
          </span>
          <span v-else>{{ scope.row[column.name] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="!isOperationHidden" fixed="right" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <cdp-table-operation :scope="scope" :operations="operations" :default="rOpn.default" :excludes="rOpn.excludes" :extra="rOpn.extra" :columns="columns" :url="innerUrl" :title="title" :permissions="permissions" :refresh-table="searchHandler" />
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="pagination">
      <el-pagination :current-page.sync="paginationConfig.page" background layout="->, prev, pager, next, jumper, sizes, total" :total="paginationConfig.total" :page-size="paginationConfig.limit" :page-sizes="[10, 20, 30, 40]" @size-change="sizeChangeHandler" @current-change="currentChangeHandler" @prev-click="preClickHandler" @next-click="nextClickHandler" />
    </el-row>
  </div>
</template>
<script>
import CdpTableOperation from '@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion/CdpTableOperation'
import { buildTree } from '@/utils/tools'
import { fetchList, deleteById, exportExcel } from '@/api/api'
export default {
  components: {
    CdpTableOperation
  },
  props: {
    isOperationHidden: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => ([])
    },
    form: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: null
    },
    selection: {
      type: Boolean,
      default: true
    },
    url: {
      type: [Object, String],
      default: null
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    rOpn: {
      type: Object,
      default: () => ({})
    },
    operations: {
      type: Array,
      default: () => (['edit', 'delete', 'view'])
    },
    permissions: {
      type: Object,
      default: () => (null)
    },
    pagination: {
      type: [Boolean, Object],
      default: () => ({
        page: 1,
        limit: 10,
        total: 0
      })
    }
  },
  data() {
    return {
      searchForm: {},
      tableData: [],
      paginationConfig: this.pagination,
      row: {},
      innerUrl: {
        editUrl: '',
        queryUrl: '',
        deleteUrl: '',
        exportUrl: ''
      },
      ids: null,
      created: false
    }
  },
  watch: {
    url(val) {
      this.searchHandler(this.form)
    }
  },
  created() {
    this.searchHandler(this.form)
  },
  methods: {
    searchHandler(searchForm) {
      // 重新查询时，勾选列表的数据置空
      this.ids = null
      if (this.url.constructor === Object) {
        this.innerUrl.queryUrl = this.url.queryUrl
        this.innerUrl.editUrl = this.url.editUrl
        this.innerUrl.deleteUrl = this.url.deleteUrl
        this.innerUrl.exportUrl = `${this.url.exportUrl}/export`
        this.innerUrl.viewUrl = this.url.viewUrl
      } else {
        this.innerUrl.queryUrl = this.url
        this.innerUrl.editUrl = this.url
        this.innerUrl.deleteUrl = this.url
        this.innerUrl.exportUrl = `${this.url}/export`
        this.innerUrl.viewUrl = this.url
      }

      this.paginationConfig = {
        ...this.paginationConfig,
        ...searchForm
      }
      if (this.innerUrl.queryUrl) {
        fetchList(this.paginationConfig, this.innerUrl.queryUrl).then(response => {
          if (this.pagination) {
            this.tableData = [...response.data.data.records]
            this.paginationConfig.total = response.data.data.total
          } else {
            this.tableData = buildTree({ data: [...response.data.data] })
          }
        })
      }
    },
    exportHandler(form) {
      exportExcel(form, this.innerUrl.exportUrl).then(res => {
        const blob = new Blob([res.data], { type: 'application/actet-stream;charset=utf-8' })
        const contentDisposition = res.headers['content-disposition'] // 从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
        const result = patt.exec(contentDisposition)
        const filename = result[1]
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) // 创建下载的链接
        downloadElement.style.display = 'none'
        downloadElement.href = href
        downloadElement.download = filename // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
      })
    },
    deleteHandler(id) {
      const ids = this.ids
      const arr = []
      if (id) {
        arr.push(id)
      } else if (ids) {
        arr.push(...ids)
      }
      if (arr.length === 0) {
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
        deleteById(`${this.innerUrl.deleteUrl}\\${arr.join(',')}`).then(({ data }) => {
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.searchHandler(this.searchForm)
          } else {
            this.$message({
              type: 'danger',
              message: '删除失败!'
            })
          }
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
      this.$emit('input', this.ids)
    },
    selectAll(selection) {
      this.ids = selection.map(item => item.id)
      this.$emit('input', this.ids)
    },
    sizeChangeHandler(pageSize) {
      this.paginationConfig.limit = pageSize
      this.searchHandler(this.searchForm)
    },
    currentChangeHandler(currentPage) {
      this.paginationConfig.page = currentPage
      this.searchHandler(this.searchForm)
    },
    preClickHandler(currentPage) {
      this.paginationConfig.page = currentPage
      this.searchHandler(this.searchForm)
    },
    nextClickHandler(currentPage) {
      this.paginationConfig.page = currentPage
      this.searchHandler(this.searchForm)
    },
    calIndex(index) {
      return (this.paginationConfig.page - 1) * this.paginationConfig.limit + index + 1
    }
  }
}
</script>

