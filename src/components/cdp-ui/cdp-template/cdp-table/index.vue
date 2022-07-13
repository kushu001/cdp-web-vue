<template>
  <div>
    <cdp-search-region v-if="layout.includes('search')" :conditions="tableConfig.columns" :search="searchHandler" />
    <cdp-operation-region v-if="layout.includes('operation')" :columns="tableConfig.columns" :url="tableConfig.url" :title="tableConfig.title" :search="searchHandler" :delete="deleteHandler">
      <slot name="operations" :selectIds="selectIds" />
    </cdp-operation-region>
    <cdp-table-region v-if="layout.includes('table')" ref="table" v-slot:default="slotProps" v-model="selectIds" style="margin-top: 10px" :columns="tableConfig.columns" :title="tableConfig.title" :url="tableConfig.url" :pagination="tableConfig.pagination">
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
    return {
      selectIds: [],
      layout: !this.tableConfig.layout ? layout : this.tableConfig.layout
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
