<template>
  <el-button v-permission="permission" type="text" size="small" @click="resetPassword">重置密码</el-button>
</template>
<script>
import { update } from '@/api/api'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  directives: { permission },
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    permission: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    console.log(this.permission, 'resetPassword')
    return {}
  },
  methods: {
    resetPassword() {
      this.$confirm('重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        update({}, `/api/v1/account/password/${this.row.id}`).then(({ data }) => {
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '重置成功!'
            })
          } else {
            this.$message({
              type: 'danger',
              message: '重置失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    }
  }
}
</script>

