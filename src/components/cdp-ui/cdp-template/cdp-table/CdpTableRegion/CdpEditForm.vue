<template>
  <el-dialog :title="`修改${title}`" :append-to-body="true" :visible.sync="visible" :before-close="closeHandler">
    <el-form ref="form" :inline="true" :model="form" label-width="120px">
      <span v-for="item in formItems" :key="item.formConfig.name">
        <el-form-item v-if="!item.formConfig.hidden" :label="item.label" :prop="item.formConfig.name">
          <el-input v-if="item.formConfig.type=='input'" v-model="form[item.formConfig.name]" style="width:200px" :name="item.formConfig.name" :placeholder="`请输入${item.label}`" />
          <el-select v-if="item.formConfig.type=='select'" v-model="form[item.formConfig.name]" :multiple="item.formConfig.multiple" :filterable="item.formConfig.filterable" :placeholder="`请选择${item.label}`">
            <el-option v-for="it in item.data" :key="it.key" :label="it.value" :value="it.key" />
          </el-select>
          <el-date-picker v-if="item.formConfig.type=='date'" v-model="form[item.formConfig.name]" type="date" />
          <el-input v-if="item.formConfig.type=='textarea'" v-model="form[item.formConfig.name]" style="width:530px;" :rows="5" type="textarea" />
        </el-form-item>
      </span>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeHandler">取 消</el-button>
      <el-button type="primary" @click="submitHandler">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { get } from '@/api/api'
import { fetchList } from '@/api/api'

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    id: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    // 设置formConfig默认值
    const formItems = this.columns.map(item => {
      return {
        ...item,
        formConfig: {
          name: item.name,
          type: 'input',
          multiple: false,
          filterable: false,
          key: 'key',
          value: 'value',
          url: '',
          hidden: false,
          rules: [{}],
          ...item.formConfig
        }
      }
    })
    return {
      form: [...formItems].map(item => item.name).reduce((obj, cur, index) => {
        obj[cur] = ''
        return obj
      }, {}),
      formItems
    }
  },
  watch: {
    id(val) {
      get(`${this.url}\\${val}`).then(({ data }) => {
        if (data.code === 200) {
          this.form = { ...data.data }
        } else {
          this.$message({
            type: 'error',
            message: '查询失败!'
          })
        }
      })
    }
  },
  created() {
    for (let i = 0; i < this.formItems.length; i++) {
      if (this.formItems[i].formConfig && this.formItems[i].formConfig.url) {
        fetchList({}, this.formItems[i].formConfig.url).then(({ data }) => {
          this.formItems[i].data = data.data.map(item => ({
            key: item[this.formItems[i].formConfig.key],
            value: item[this.formItems[i].formConfig.value]
          }))
        })
      }
    }
  },
  methods: {
    closeHandler() {
      this.$emit('update:visible', !this.visible)
      // this.$refs.form.resetFields()
    },
    submitHandler() {
      this.$emit('editHandler', this.form)
    },
    resetHandler() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
