<template>
  <span>
    <!-- Form -->
    <el-dialog :title="`${opt}${title}`" :visible.sync="dialogFormVisible" :before-close="closeHandler">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px">
        <span v-for="column in columns" :key="column.name">
          <el-form-item v-if="!column.formHidden" :label="column.label" :prop="column.name">
            <el-input v-if="column.type=='input'" v-model="form[column.name]" style="width:200px" :name="column.name" :placeholder="`请输入${column.label}`" />
            <el-select v-if="column.type=='select'" v-model="form[column.name]" :placeholder="`请选择${column.label}`">
              <el-option v-for="it in column.data" :key="it.key" :label="it.value" :value="it.key" />
            </el-select>
            <el-date-picker v-if="column.type=='date'" v-model="form[column.name]" type="date" />
            <el-input v-if="column.type=='textarea'" v-model="form[column.name]" style="width:530px;" :rows="5" type="textarea" />
          </el-form-item>
        </span>
        <el-row type="flex" justify="end">
          <el-col :span="10">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button @click="closeHandler">取消</el-button>
              <el-button type="primary" @click="dialogVisible=true">测试弹窗</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" title="" width="100">hello</el-dialog>
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
    'rules': {
      type: Object,
      default: () => ({})
    },
    'opt': {
      type: String,
      default: null
    },
    'title': {
      type: String,
      default: null
    },
    'item': {
      type: Object,
      default: () => ({})
    },
    'callback': {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    const form = [...this.columns.filter(item => !item.formHidden)].map(item => item.name).reduce((obj, cur, index) => {
      obj[cur] = ''
      return obj
    }, {})
    return {
      form,
      dialogVisible: false
    }
  },
  watch: {
    item() {
      this.form = { ...this.item }
    }
  },
  created() {
    console.log('created')
  },
  methods: {
    closeHandler() {
      this.$nextTick(function() {
        this.$refs['form'].resetFields()
        for (var key in this.form) {
          if (Object.prototype.hasOwnProperty.call(this.form, key)) {
            this.form[key] = ''
          }
        }
      })
      this.$emit('update:dialogFormVisible', !this.dialogFormVisible)
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.callback(this.form)
        }
      })
    }
  }
}
</script>
