<template>
  <div style="margin:0 20px">
    <el-table ref="multipleTable" :data="tableData" border row-key="id" size="mini" @select="select" @select-all="selectAll">
      <el-table-column v-if="selection && pagination" type="selection" width="55" />
      <!-- <el-table-column type="index" :index="calIndex"></el-table-column> -->
      <template v-for="column in columns">
        <el-table-column v-if="!column.hidden" :key="column.name" :align="column.align" :prop="column.name" :label="column.label" :width="column.width">>
          <template slot-scope="scope">
            <cdp-table-column-item :render="column.render" :record="scope.row" :value="scope.row[column.name]" />
          </template>
        </el-table-column>
      </template>
      <el-table-column v-if="Object.keys(rOpn).length===0 || rOpn.default" fixed="right" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <cdp-table-operation
            :scope="scope"
            :default="rOpn.default"
            :excludes="rOpn.excludes"
            :extra="rOpn.extra"
            :columns="columns"
            :url="innerUrl"
            :title="title"
            :refresh-table="searchHandler"
            v-on="$listeners"
          />
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
import CdpTableColumnItem from './components/CdpTableColumnItem'
import { buildTree } from '@/utils/tools'
import { fetchList } from '@/api/api'
export default {
  components: {
    CdpTableOperation,
    CdpTableColumnItem
  },
  props: {
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
    parent: {
      type: [Number, String],
      default: undefined
    },
    pagination: {
      type: [Boolean, Object],
      default: () => ({
        page: 1,
        limit: 10,
        total: 0
      })
    },
    flippingMemory: {
      type: Boolean,
      default: false
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
      ids: this.value,
      created: false,
      selectedAllMap: new Map()
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
    searchHandler(searchForm, currentPage) {
      // 重新查询时，勾选列表的数据置空
      if (!!this.url && this.url.constructor === Object) {
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

      if (currentPage) {
        this.paginationConfig.page = currentPage
      }

      if (this.innerUrl.queryUrl) {
        fetchList(this.paginationConfig, this.innerUrl.queryUrl).then(response => {
          if (this.pagination) {
            this.tableData = [...response.data.data.records]
            this.paginationConfig.total = response.data.data.total
            this.$nextTick(() => {
              this.tableData.forEach(item => {
                if (this.ids.find(id => item.id === id) > 0) {
                  this.$refs.multipleTable.toggleRowSelection(item)
                }
              })
              if (!this.flippingMemory) {
                this.ids = []
              }
            })
          } else {
            this.tableData = buildTree({ data: [...response.data.data] })
          }
        })
      }
    },
    select(rows, row) {
      if (this.flippingMemory) {
        const selected = rows.length && rows.indexOf(row) !== -1
        if (!selected) {
          this.ids = this.ids.filter(id => id !== row.id)
        } else {
          this.ids.push(row.id)
        }
        this.ids = [...new Set(this.ids)]
      } else {
        this.ids = rows.map(item => item.id)
      }
      this.$emit('input', this.ids)
    },
    selectAll(rows) {
      if (this.flippingMemory) {
        if (rows.length > 0) {
          this.ids.push(...rows.map(item => item.id))
          this.selectedAllMap.set(this.paginationConfig.page, rows.map(item => item.id))
        } else {
          const deletedIds = this.selectedAllMap.get(this.paginationConfig.page)
          this.ids = !deletedIds ? [] : this.ids.filter(item => !deletedIds.includes(item))
          this.selectedAllMap.delete(this.paginationConfig.page)
        }
        this.ids = [...new Set(this.ids)]
      } else {
        this.ids = rows.map(item => item.id)
      }
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

