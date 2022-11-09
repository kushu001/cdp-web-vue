<template>
  <div>
    <cdp-search-region v-if="layout.includes('search')" v-model="searchForm" :conditions="columns" :search="searchHandler" />
    <cdp-operation-region v-if="layout.includes('operation')" :permissions="permissions" :columns="columns" :url="tableConfig.url" :title="tableConfig.title" :operations="operations" :search="searchHandler" :delete="deleteHandler" :export="exportHandler">
      <slot name="operations" :selectIds="selectIds" />
    </cdp-operation-region>
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
      :permissions="permissions"
      :pagination="tableConfig.pagination"
      :is-operation-hidden="tableConfig.isOperationHidden"
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
        type: !item.formConfig ? undefined : item.formConfig.type
      }
    })

    debugger

    return {
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
    },
    addDialogHandler() {

    },
    deleteHandler() {
      this.$refs.table.deleteHandler()
    },
    exportHandler() {
      this.$refs.table.exportHandler(this.searchForm)
    }

  }
}
</script>
<style scoped>
.upload {
  float:left;
  margin-right:-1px;
}
.upload-button{
  border-radius:0px
}
</style>
