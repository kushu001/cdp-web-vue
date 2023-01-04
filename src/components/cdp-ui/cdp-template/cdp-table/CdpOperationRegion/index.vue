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
    hOpn: {
      type: Object,
      default: () => ({})
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
    const hOpn = {
      default: true,
      excludes: [],
      extra: [],
      ...this.hOpn
    }

    const components = []
    const buttons = [
      { name: 'AddButton', path: 'cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/' },
      { name: 'BatchDeleteButton', path: 'cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/' },
      { name: 'ImportButton', path: 'cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/' },
      { name: 'ExportButton', path: 'cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/' }
    ]
    let defaultButtons = buttons

    if (hOpn.default.length > 0) {
      defaultButtons = buttons.filter(item => this.hOpn.default.includes(item.name))
    }

    if (!hOpn.default || hOpn.default.length <= 0) {
      defaultButtons = []
    }

    if (hOpn.excludes.length > 0) {
      defaultButtons = buttons.filter(item => !hOpn.excludes.includes(item.name))
    }

    defaultButtons.forEach(function(item) {
      const component = (resolve) => require([`@/components/${item.path}${item.name}`], resolve)
      components.push(component)
    })

    hOpn.extra.forEach(function(item) {
      const extraButton = (resolve) => require([`@/views/${item.path}/components/${item.name}`], resolve)
      components.push(extraButton)
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
