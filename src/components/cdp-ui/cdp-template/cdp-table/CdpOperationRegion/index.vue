<template>
  <div style="margin:0 20px">
    <el-button-group>
      <el-button v-if="operations.includes('add')" type="success" size="mini" icon="el-icon-plus" @click="addDialogHandler">新增</el-button>
      <el-button v-if="operations.includes('delete')" type="primary" size="mini" icon="el-icon-delete" @click="deleteHandler">批量删除</el-button>
      <slot />
      <el-upload v-if="operations.includes('import')" action="" class="upload">
        <el-button type="primary" class="upload-button" size="mini" icon="el-icon-upload2">导入</el-button>
      </el-upload>
      <el-button v-if="operations.includes('export')" type="primary" size="mini" icon="el-icon-download">导出</el-button>
    </el-button-group>
    <cdp-add-form ref="child" :visible.sync="visible" :title="title" :url="url" :columns="columns" @addHandler="addHandler" />
  </div>
</template>
<script>
import CdpAddForm from '@/components/cdp-ui/cdp-template/cdp-table/CdpOperationRegion/CdpAddForm'
import { eventBus } from '@/components/cdp-ui/cdp-template/cdp-table/bus'
import { add } from '@/api/api'

export default {
  components: {
    CdpAddForm
  },
  props: {
    title: {
      type: String,
      default: null
    },
    url: {
      type: String,
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
      visible: false
    }
  },
  created() {
    eventBus.$on('selectHandler', function(selection) {
      console.log(selection)
    })
  },
  beforeDestroy() {
    eventBus.$off('selectHandler')
  },
  methods: {
    addDialogHandler() {
      this.visible = true
    },
    addHandler(form) {
      add(form, this.url).then(({ data }) => {
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '新建成功'
          })
          this.visible = false
          this.$refs.child.resetHandler()
          eventBus.$emit('searchHandler', {})
        } else {
          this.$message({
            type: 'danger',
            message: '新建失败'
          })
        }
      })
    },
    deleteHandler() {
      eventBus.$emit('deleteHandler')
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

