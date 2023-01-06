<template>
  <el-button v-permission="permission" type="primary" size="mini" icon="el-icon-delete" @click="deleteHandler">批量删除</el-button>
</template>
<script>
import { deleteById } from '@/api/api'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  directives: { permission },
  props: {
    selectIds: {
      type: Array,
      default: () => ([])
    },
    url: {
      type: Object,
      default: () => ({})
    },
    refreshTable: {
      type: Function,
      default: () => ({})
    },
    permission: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    deleteHandler() {
      if (this.selectIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '请勾选要删除的记录'
        })
        return
      }

      this.$confirm('确认删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(`${this.url.deleteUrl}\\${this.selectIds.join(',')}`).then(({ data }) => {
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
