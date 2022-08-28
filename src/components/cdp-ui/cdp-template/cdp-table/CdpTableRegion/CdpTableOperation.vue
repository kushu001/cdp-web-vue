<template>
  <span>
    <el-button v-if="operations.includes('view')" type="text" size="small" @click="viewDialogHandler">查 看</el-button>
    <el-button v-if="operations.includes('edit')" type="text" size="small" @click="editDialogHandler">编 辑</el-button>
    <el-button v-if="operations.includes('delete')" type="text" size="small" @click="deleteHandler">删 除</el-button>
    <slot name="defaultOperation" />
  </span>
</template>
<script>
export default {
  props: {
    scope: {
      type: Object,
      default: () => ({})
    },
    operations: {
      type: Array,
      default: () => (['edit', 'delete', 'view'])
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
