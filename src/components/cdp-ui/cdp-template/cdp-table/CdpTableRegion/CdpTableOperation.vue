<template>
  <span>
    <span v-for="(item, index) in components" :key="`rating_${index}`" style="margin-right: 5px">
      <component :is="item['component']" :row="scope.row" :refresh-table="refreshTable" :columns="columns" :title="title" :url="url" :permission="item['permissions']" v-on="$listeners" />
    </span>
    <el-dropdown v-if="moreComponents.length>0" size="small" :hide-on-click="false" trigger="click">
      <el-button type="text" size="small">
        更 多<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in moreComponents" :key="`extra_${index}`">
          <component :is="item['component']" :row="scope.row" :refresh-table="refreshTable" :columns="columns" :title="title" :url="url" v-on="$listeners" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </span>
</template>
<script>
import { checkPermission } from '@/utils/tools'

export default {
  props: {
    scope: {
      type: Object,
      default: () => ({})
    },
    default: {
      type: [Array, Boolean],
      default: true
    },
    excludes: {
      type: Array,
      default: () => ([])
    },
    extra: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: null
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    refreshTable: {
      type: Function,
      default: () => ({})
    },
    url: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    let components = []
    const buttons = [
      { name: 'ViewButton', isDefault: true },
      { name: 'EditButton', isDefault: true },
      { name: 'DeleteButton', isDefault: true },
      { name: 'ConfirmButton', isDefault: false }
    ]

    const defaultButtons = buttons.filter(item => item.isDefault)

    if (this.default.length > 0) {
      this.default.forEach(function(item) {
        let component
        if (!item.path) {
          component = (resolve) => require([`@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion/components/${item.name}`], resolve)
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
        const component = (resolve) => require([`@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion/components/${item.name}`], resolve)
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

    let moreComponents = []
    if (components.length > 4) {
      moreComponents = components.splice(3, components.length)
    }

    return {
      components,
      moreComponents }
  },
  methods: {
    editDialogHandler() {
      this.$emit('editDialogHandler', this.scope)
    },
    deleteHandler() {
      this.$emit('deleteHandler', this.scope.row.id)
    },
    viewDialogHandler() {
      this.$emit('viewDialogHandler', this.scope)
    }
  }
}
</script>
