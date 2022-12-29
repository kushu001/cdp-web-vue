<template>
  <el-button type="text" size="small" @click="deleteHandler">删 除</el-button>
</template>
<script>
import { deleteById } from '@/api/api'
export default {
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    url: {
      type: Object,
      default: () => ({})
    },
    refreshTable: {
      type: Function,
      default: () => ({})
    }
  },
  methods: {
    deleteHandler() {
      this.$confirm('确认删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(`${this.url.deleteUrl}\\${this.row.id}`).then(({ data }) => {
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.refreshTable()
          } else {
            this.$message({
              type: 'danger',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

