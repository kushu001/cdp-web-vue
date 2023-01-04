<template>
  <div style="margin:0 20px">
    <component :is="item" v-for="(item, index) in components" :key="`rating_${index}`" :columns="columns" :url="url" :title="title" :select-ids="selectIds" :search-form="searchForm" :refresh-table="search" />
    <el-dropdown v-if="moreComponents.length>0">
      <el-button type="primary" size="mini">
        更多...<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in moreComponents" :key="`extra_${index}`">
          <component :is="item" :columns="columns" :url="url" :title="title" :select-ids="selectIds" :search-form="searchForm" :refresh-table="search" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import permission from '@/directive/permission/index.js' // 权限判断指令

export default {
  directives: { permission },
  props: {
    search: {
      type: Function,
      default: () => {}
    },
    title: {
      type: String,
      default: null
    },
    url: {
      type: [String, Object],
      default: null
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    operations: {
      type: Array,
      default: () => (['add', 'delete', 'import', 'export'])
    },
    permissions: {
      type: Object,
      default: () => (null)
    },
    selectIds: {
      type: Array,
      default: () => ([])
    },
    searchForm: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const components = []
    const buttons = [
      { name: 'AddButton', path: 'cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/' },
      { name: 'BatchDeleteButton', path: 'cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/' },
      { name: 'ImportButton', path: 'cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/' },
      { name: 'ExportButton', path: 'cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/' }
    ]

    buttons.forEach(function(item) {
      const component = (resolve) => require([`@/components/${item.path}${item.name}`], resolve)
      components.push(component)
    })

    const moreComponents = []
    // if (components.length > 5) {
    //   moreComponents = components.splice(4, components.length)
    // }

    return {
      components,
      moreComponents,
      permission: !this.permissions ? { 'add': [], 'delete': [], 'import': [], 'export': [] } : { ...{ 'add': ['default'], 'delete': ['default'], 'import': ['default'], 'export': ['default'] }, ...this.permissions }
    }
  }
}
</script>
