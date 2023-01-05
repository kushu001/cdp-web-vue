<template>
  <el-button type="primary" @click="conformHandler">确认</el-button>
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
    conformHandler() {
      this.$emit('conformHandler', this.row)
    }
  }
}
</script>
