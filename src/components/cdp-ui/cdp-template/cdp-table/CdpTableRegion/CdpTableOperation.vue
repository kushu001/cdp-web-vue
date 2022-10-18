<template>
  <span>
    <el-button v-if="operations.includes('view')" v-permission="permission['view']" type="text" size="small" @click="viewDialogHandler">查 看</el-button>
    <el-button v-if="operations.includes('edit')" v-permission="permission['edit']" type="text" size="small" @click="editDialogHandler">编 辑</el-button>
    <el-button v-if="operations.includes('delete')" v-permission="permission['delete']" type="text" size="small" @click="deleteHandler">删 除</el-button>
    <slot name="defaultOperation" />
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
      default: () => (null)
    }
  },
  data() {
    return {
      permission: !this.permissions ? { 'edit': [], 'delete': [], 'view': [] } : { ...{ 'edit': ['default'], 'delete': ['default'], 'view': ['default'] }, ...this.permissions }
    }
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
