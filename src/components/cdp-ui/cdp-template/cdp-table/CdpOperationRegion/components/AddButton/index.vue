<template>
  <el-button type="success" size="mini" icon="el-icon-plus" @click="addDialogHandler">
    新增
    <cdp-add-form ref="child" :visible.sync="visible" :title="title" :columns="innerColumns" @addHandler="addHandler" />
  </el-button>
</template>

<script>
import CdpAddForm from './CdpAddForm'
import { add } from '@/api/api'
export default {
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
    const innerColumns = this.columns.filter(item => {
      console.log(item.name, !item.formConfig.hidden)
      return !item.formConfig.hidden
    })
    console.log(innerColumns)
    return {
      innerColumns,
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
