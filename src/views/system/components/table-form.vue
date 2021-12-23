<template>
  <span style="margin:0 10px">
    <!-- Form -->
    <el-dialog :title="`新增${title}`" :visible.sync="dialogFormVisible" :before-close="closeHandler">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item v-for="column in columns" :key="column.name" :label="column.label">
          <el-input v-if="column.type=='input'" v-model="column.defaultValue" :name="column.name" :placeholder="`请输入${column.label}`" />
          <el-select v-if="column.type=='select'" v-model="formInline.region" :placeholder="`请选择${column.label}`">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
          <el-date-picker v-if="column.type=='date'" v-model="column.defaultValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>

<script>
export default {
  props: {
    'dialogFormVisible': {
      type: Boolean,
      default: false
    },
    'columns': {
      type: Array,
      default: null
    },
    'title': {
      type: String,
      default: null
    }
  },
  data() {
    const form = {}
    this.columns.forEach(item => {
      form[item.name] = ''
    })
    return {
      form: form,
      formLabelWidth: '70px'
    }
  },
  methods: {
    closeHandler() {
      this.$refs['form'].resetFields()
      this.$emit('update:dialogFormVisible', !this.dialogFormVisible)
    },
    onSubmit() {},
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
