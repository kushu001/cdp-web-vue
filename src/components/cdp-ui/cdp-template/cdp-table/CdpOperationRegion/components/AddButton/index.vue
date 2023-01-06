<template>
  <el-button v-permission="permission" type="success" size="mini" icon="el-icon-plus" @click="addDialogHandler">
    新增
    <cdp-add-form ref="child" :visible.sync="visible" :title="title" :columns="columns" @addHandler="addHandler" />
  </el-button>
</template>

<script>
import CdpAddForm from './CdpAddForm'
import { add } from '@/api/api'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  directives: { permission },
  components: {
    CdpAddForm
  },
  props: {
    selectIds: {
      type: Array,
      default: () => ([])
    },
    searchForm: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: null
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
  data() {
    return {
      visible: false
    }
  },
  methods: {
    addDialogHandler() {
      this.visible = true
    },
    addHandler(form) {
      add(form, this.url.addUrl).then(({ data }) => {
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '新建成功'
          })
          this.visible = false
          this.$refs.child.resetHandler()
          this.refreshTable()
        } else {
          this.$message({
            type: 'danger',
            message: '新建失败'
          })
        }
      })
    }
  }
}
</script>
