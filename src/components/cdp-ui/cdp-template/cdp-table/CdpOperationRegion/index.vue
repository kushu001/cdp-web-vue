<template>
  <div style="margin:0 20px">
    <component
      :is="item['component']"
      v-for="(item, index) in components"
      :key="`rating_${index}`"
      :columns="columns"
      :url="url"
      :title="title"
      :select-ids="selectIds"
      :search-form="searchForm"
      :refresh-table="search"
      v-on="$listeners"
    />
    <el-dropdown v-if="moreComponents.length>0">
      <el-button type="primary" size="mini">
        更多...<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in moreComponents" :key="`extra_${index}`">
          <component :is="item['component']" :columns="columns" :url="url" :title="title" :select-ids="selectIds" :search-form="searchForm" :refresh-table="search" v-on="$listeners" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { checkPermission } from '@/utils/tools'
export default {
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

    let components = []
    const buttons = [
      { name: 'AddButton', isDefault: true },
      { name: 'BatchDeleteButton', isDefault: true },
      { name: 'ImportButton', isDefault: true },
      { name: 'ExportButton', isDefault: true }
    ]

    const defaultButtons = buttons.filter(item => item.isDefault)
    if (hOpn.default.length > 0) {
      hOpn.default.forEach(function(item) {
        let component
        if (!item.path) {
          component = (resolve) => require([`@/components/cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/${item.name}`], resolve)
        } else {
          component = (resolve) => require([`@/views${item.path}/${item.name}`], resolve)
        }
        const obj = {}
        obj['component'] = component
        obj['permissions'] = item.permissions
        components.push(obj)
      })
    } else {
      defaultButtons.forEach(function(item) {
        const component = (resolve) => require([`@/components/cdp-ui/cdp-template/cdp-table/CdpOperationRegion/components/${item.name}`], resolve)
        const obj = {}
        obj['component'] = component
        obj['permissions'] = item.permissions
        components.push(obj)
      })
    }

    // 过滤掉没有权限的按钮组件
    components = components.filter(item => {
      if (!item.permissions || item.permissions.length === 0) {
        return true
      } else {
        return checkPermission(item.permissions)
      }
    })
    const moreComponents = []
    // if (components.length > 5) {
    //   moreComponents = components.splice(4, components.length)
    // }

    return {
      components,
      moreComponents
    }
  }
}
</script>
