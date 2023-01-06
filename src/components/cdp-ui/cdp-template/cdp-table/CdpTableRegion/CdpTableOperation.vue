<template>
  <span>
    <!-- <el-button v-if="operations.includes('view')" v-permission="permission['view']" type="text" size="small" @click="viewDialogHandler">查 看</el-button>
    <el-button v-if="operations.includes('edit')" v-permission="permission['edit']" type="text" size="small" @click="editDialogHandler">编 辑</el-button>
    <el-button v-if="operations.includes('delete')" v-permission="permission['delete']" type="text" size="small" @click="deleteHandler">删 除</el-button> -->
    <span v-for="(item, index) in components" :key="`rating_${index}`" style="margin-right: 5px">
      <component :is="item['component']" :row="scope.row" :refresh-table="refreshTable" :columns="columns" :title="title" :url="url" :permission="item['permission']" v-on="$listeners" />
    </span>
    <el-dropdown v-if="moreComponents.length>0" size="small" :hide-on-click="false" trigger="click">
      <el-button type="text" size="small">
        更 多<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in moreComponents" :key="`extra_${index}`">
          <component :is="item['component']" :row="scope.row" :refresh-table="refreshTable" :columns="columns" :title="title" :url="url" :permission="item['permission']" v-on="$listeners" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <slot name="defaultOperation" /> -->
  </span>
</template>
<script>
import permission from '@/directive/permission/index.js' // 权限判断指令

export default {
  directives: { permission },
  props: {
    scope: {
      type: Object,
      default: () => ({})
    },
    operations: {
      type: Array,
      default: () => (['edit', 'delete', 'view'])
    },
    permissions: {
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
    const components = []
    const buttons = [
      { name: 'ViewButton', path: 'cdp-ui/cdp-template/cdp-table/CdpTableRegion/components/', isDefault: true, permission: [] },
      { name: 'EditButton', path: 'cdp-ui/cdp-template/cdp-table/CdpTableRegion/components/', isDefault: true, permission: [] },
      { name: 'DeleteButton', path: 'cdp-ui/cdp-template/cdp-table/CdpTableRegion/components/', isDefault: true, permission: [] },
      { name: 'ConfirmButton', path: 'cdp-ui/cdp-template/cdp-table/CdpTableRegion/components/', isDefault: false, permission: [] }
    ]

    let defaultButtons = buttons.filter(item => item.isDefault)

    // defaultButtons.map(item => item.permission = this.permissions[item.name])

    if (this.permissions && Object.keys(this.permissions).length > 0) {
      defaultButtons.map(item => { item.permission = this.permissions[item.name] })
      this.extra.map(item => { item.permission = this.permissions[item.name] })
    }

    if (this.default.length > 0) {
      defaultButtons = buttons.filter(item => this.default.includes(item.name))
    }

    if (!this.default || this.default.length <= 0) {
      defaultButtons = []
    }

    if (this.excludes.length > 0) {
      defaultButtons = buttons.filter(item => !this.excludes.includes(item.name))
    }

    defaultButtons.forEach(function(item) {
      const component = (resolve) => require([`@/components/${item.path}${item.name}`], resolve)
      const obj = {}
      obj['component'] = component
      obj['permission'] = item.permission
      components.push(obj)
    })

    this.extra.forEach(function(item) {
      const extraButton = (resolve) => require([`@/views/${item.path}/components/${item.name}`], resolve)
      const obj = {}
      obj['component'] = extraButton
      obj['permission'] = item.permission
      components.push(obj)
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
