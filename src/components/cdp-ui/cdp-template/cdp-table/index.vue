<template>
  <div>
    <cdp-search-region v-if="layout.includes('search')" ref="searchRegion" v-model="searchForm" :conditions="columns" :search="searchHandler" />
    <cdp-operation-region
      v-if="!(tableConfig.hOpn && !tableConfig.hOpn.default)"
      :columns="columns"
      :select-ids="selectIds"
      :search-form="searchForm"
      :url="innerUrl"
      :title="tableConfig.title"
      :search="searchHandler"
      :h-opn="tableConfig.hOpn"
      v-on="$listeners"
    />
    <cdp-table-region
      v-if="layout.includes('table')"
      ref="table"
      v-slot:default="slotProps"
      v-model="selectIds"
      style="margin-top: 10px"
      :selection="tableConfig.selection"
      :columns="columns"
      :title="tableConfig.title"
      :url="tableConfig.url"
      :r-opn="tableConfig.rOpn"
      :pagination="tableConfig.pagination"
      :parent="tableConfig.parent"
      :flipping-memory="tableConfig.flippingMemory"
      v-on="$listeners"
    >
      <slot name="tableOperations" :row="slotProps.scope.row" />
    </cdp-table-region>
  </div>
</template>
<script>
import CdpSearchRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpSearchRegion'
import CdpOperationRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpOperationRegion'
import CdpTableRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion'
export default {
  components: {
    CdpSearchRegion,
    CdpOperationRegion,
    CdpTableRegion
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    tableConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const layout = ['search', 'operation', 'table']
    const columns = this.tableConfig.columns.map(item => {
      return {
        ...item,
        formConfig: {
          name: item.name,
          type: 'input',
          multiple: false,
          filterable: false,
          key: 'key',
          value: 'value',
          url: '',
          hidden: false,
          rules: [],
          ...item.formConfig
        },
        type: item.formConfig ? item.formConfig.type : 'input'
      }
    })

    const innerUrl = {}

    if (!!this.tableConfig.url && this.tableConfig.url.constructor === Object) {
      innerUrl.addUrl = this.tableConfig.url.addUrl
      innerUrl.queryUrl = this.tableConfig.url.queryUrl
      innerUrl.editUrl = this.tableConfig.url.editUrl
      innerUrl.deleteUrl = this.tableConfig.url.deleteUrl
      innerUrl.exportUrl = `${this.tableConfig.url.exportUrl}/export`
      innerUrl.viewUrl = this.tableConfig.url.viewUrl
    } else {
      innerUrl.addUrl = this.tableConfig.url
      innerUrl.queryUrl = this.tableConfig.url
      innerUrl.editUrl = this.tableConfig.url
      innerUrl.deleteUrl = this.tableConfig.url
      innerUrl.exportUrl = `${this.tableConfig.url}/export`
      innerUrl.viewUrl = this.tableConfig.url
    }
    return {
      innerUrl,
      selectIds: [],
      layout: !this.tableConfig.layout ? layout : this.tableConfig.layout,
      searchForm: {},
      columns
    }
  },
  watch: {
    value(val) {
      this.selectIds = !val ? [] : val
    },
    selectIds(newVal, oldVal) {
      this.$emit('input', newVal)
    },
    tableConfig: {
      handler(newTableConfig, oldTableConfig) {
        if (!!newTableConfig.url && newTableConfig.url.constructor === Object) {
          this.innerUrl.addUrl = newTableConfig.url.addUrl
          this.innerUrl.queryUrl = newTableConfig.url.queryUrl
          this.innerUrl.editUrl = newTableConfig.url.editUrl
          this.innerUrl.deleteUrl = newTableConfig.url.deleteUrl
          this.innerUrl.exportUrl = `${newTableConfig.url.exportUrl}/export`
          this.innerUrl.viewUrl = newTableConfig.url.viewUrl
        } else {
          this.innerUrl.addUrl = newTableConfig.url
          this.innerUrl.queryUrl = newTableConfig.url
          this.innerUrl.editUrl = newTableConfig.url
          this.innerUrl.deleteUrl = newTableConfig.url
          this.innerUrl.exportUrl = `${newTableConfig.url}/export`
          this.innerUrl.viewUrl = newTableConfig.url
        }
      },
      deep: true
    }
  },
  methods: {
    searchHandler(form) {
      this.$refs.table.searchHandler(form)
    },
    resetSearchForm() {
      this.$refs.searchRegion.resetHandler()
    }
  }
}
</script>
