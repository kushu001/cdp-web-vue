<template>
  <div style="margin:0 20px">
    <el-button-group>
      <el-button v-if="operations.includes('add')" type="success" size="mini" icon="el-icon-plus" @click="addDialogHandler">新增</el-button>
      <el-button v-if="operations.includes('delete')" type="primary" size="mini" icon="el-icon-delete" @click="deleteHandler">批量删除</el-button>
      <slot />
      <el-upload v-if="operations.includes('import')" action="" class="upload">
        <el-button type="primary" class="upload-button" size="mini" icon="el-icon-upload2">导入</el-button>
      </el-upload>
      <el-button v-if="operations.includes('export')" type="primary" size="mini" icon="el-icon-download" @click="exportHandler">导出</el-button>
    </el-button-group>
    <cdp-add-form ref="child" :visible.sync="visible" :title="title" :url="addUrl" :columns="columns" @addHandler="addHandler" />
  </div>
</template>
<script>
import CdpAddForm from '@/components/cdp-ui/cdp-template/cdp-table/CdpOperationRegion/CdpAddForm'
import { add } from '@/api/api'

export default {
  components: {
    CdpAddForm
  },
  props: {
    search: {
      type: Function,
      default: () => {}
    },
    delete: {
      type: Function,
      default: () => {}
    },
    export: {
      type: Function,
      default: () => {}
    },
    title: {
      type: String,
      default: null
    },
    url: {
      type: [String, Object],
      default: null
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    operations: {
      type: Array,
      default: () => (['add', 'delete', 'import', 'export'])
    }
  },
  data() {
    return {
      visible: false,
      addUrl: ''
    }
  },
  watch: {
    url(val) {
      if (val.constructor === Object) {
        this.addUrl = this.url.addUrl
      } else {
        this.addUrl = this.url
      }
    }
  },
  created() {
    if (this.url.constructor === Object) {
      this.addUrl = this.url.addUrl
    } else {
      this.addUrl = this.url
    }
  },
  methods: {
    addDialogHandler() {
      this.visible = true
    },
    addHandler(form) {
      add(form, this.addUrl).then(({ data }) => {
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '新建成功'
          })
          this.visible = false
          this.$refs.child.resetHandler()
          this.search()
        } else {
          this.$message({
            type: 'danger',
            message: '新建失败'
          })
        }
      })
    },
    deleteHandler() {
      this.delete()
    },
    exportHandler() {
      this.export()
    }
  }
}
</script>
<style scoped>
.upload {
  float:left;
  margin-right:-1px;
}
.upload-button{
  border-radius:0px
}
</style>

