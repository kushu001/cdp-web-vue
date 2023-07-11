<template>
  <el-button type="primary" @click="confirmHandler">确认</el-button>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    confirmHandler() {
      this.$emit('confirmHandler', this.row)
    }
  }
}
</script>
