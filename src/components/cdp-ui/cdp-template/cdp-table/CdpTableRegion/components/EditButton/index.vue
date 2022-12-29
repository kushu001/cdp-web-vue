<template>
  <span>
    <el-button type="text" size="small" @click="drawer = true">编 辑</el-button>
    <cdp-edit-form :id="row.id" :title="title" :visible.sync="drawer" :columns="columns" :url="url.editUrl" @editHandler="editHandler" />
  </span>
</template>
<script>
import CdpEditForm from '@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion/CdpEditForm'
import { update } from '@/api/api'
export default {
  components: {
    CdpEditForm
  },
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: null
    },
    url: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    refreshTable: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    editHandler(form) {
      update(form, this.url.editUrl).then(({ data }) => {
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.drawer = false
          this.refreshTable()
        } else {
          this.$message({
            type: 'danger',
            message: '修改失败'
          })
        }
      })
    }
  }
}
</script>

