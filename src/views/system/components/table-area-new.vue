<template>
  <el-table row-key="id" :data="data" style="width: 100%" border>
    <el-table-column type="selection" width="55" />
    <el-table-column v-for="column in columns" :key="column.name" :prop="column.name" :label="column.label" :width="column.width" />
    <slot name="fixed-operation" />
  </el-table>
</template>

<script>
export default {
  props: {
    'columns': {
      type: Array,
      default: null
    },
    'data': {
      type: Array,
      default: null
    }
  }
}
</script>
