<template>
  <div>
    <cdp-search-region v-if="layout.includes('search')" v-model="searchForm" :conditions="columns" :search="searchHandler" />
    <cdp-operation-region
      v-if="layout.includes('operation')"
      :permissions="permissions"
      :columns="columns"
      :select-ids="selectIds"
      :search-form="searchForm"
      :url="innerUrl"
      :title="tableConfig.title"
      :operations="operations"
      :search="searchHandler"
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
      :operations="tableOperations"
      :url="tableConfig.url"
      :r-opn="tableConfig.rOpn"
      :permissions="permissions"
      :pagination="tableConfig.pagination"
      :is-operation-hidden="tableConfig.isOperationHidden"
      :parent="tableConfig.parent"
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
    tableConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const layout = ['search', 'operation', 'table']
    const operations = ['add', 'delete', 'import', 'export']
    const tableOperations = ['edit', 'delete', 'view']

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

    if (this.tableConfig.url.constructor === Object) {
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
      operations: !this.tableConfig.operations ? operations : this.tableConfig.operations,
      tableOperations: !this.tableConfig.tableOperations ? tableOperations : this.tableConfig.tableOperations,
      permissions: !this.tableConfig.permissions ? null : this.tableConfig.permissions,
      searchForm: {},
      columns
    }
  },
  methods: {
    searchHandler(form) {
      this.$refs.table.searchHandler(form)
    }
  }
}
</script>
