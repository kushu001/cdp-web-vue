<template>
  <el-button v-if="row.status === 0" type="text" size="mini" @click="auditHandler">审 核</el-button>
</template>
<script>
import { audit } from '../../api/staff'
export default {
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    refreshTable: {
      type: Function,
      default: () => ({})
    }
  },
  methods: {
    auditHandler() {
      const { id, status } = this.row
      if (status) {
        this.$message({
          message: '审核已经通过，不需要再审核！',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认审核通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        audit(id).then(({ data: response }) => {
          this.refreshTable()
        })
      })
    }
  }
}
</script>
