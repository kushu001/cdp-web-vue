<template>
  <span style="margin:0 10px">
    <!-- Form -->
    <el-dialog :title="`${opt}${title}`" :visible.sync="dialogFormVisible" :before-close="closeHandler">
      <el-form ref="form" :model="form" label-width="120px">
        <div v-for="column in columns" :key="column.name">
          <el-form-item v-if="!column.formHidden" :label="column.label" :prop="column.name">
            <el-input v-if="column.type=='input'" v-model="form[column.name]" :name="column.name" :placeholder="`请输入${column.label}`" />
            <el-select v-if="column.type=='select'" v-model="form.region" :placeholder="`请选择${column.label}`">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
            <el-date-picker v-if="column.type=='date'" v-model="form[column.name]" type="date" />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="closeHandler">取消</el-button>
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
    'opt': {
      type: String,
      default: null
    },
    'title': {
      type: String,
      default: null
    },
    'ids': {
      type: [Number, String],
      default: null
    },
    'item': {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const form = [...this.columns].map(item => item.name).reduce((obj, cur, index) => {
      obj[cur] = ''
      return obj
    }, {})
    return {
      form
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
    onSubmit() {}
  }
}
</script>
