<template>
  <el-dialog :title="`新增${title}`" :append-to-body="true" :visible.sync="visible" :before-close="closeHandler" @opened="openHandler">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <span v-for="(item, index) in formItems" :key="index">
          <el-col v-if="index%2 == 0 && item.formConfig.type!=='textarea'" :span="12">
            <el-form-item v-if="!item.formConfig.hidden" :label="item.label" :prop="item.formConfig.name">
              <el-input v-if="item.formConfig.type=='input'" v-model="form[item.formConfig.name]" style="width:100%" :name="item.formConfig.name" :placeholder="`请输入${item.label}`" />
              <el-select v-if="item.formConfig.type=='select'" v-model="form[item.formConfig.name]" style="width:100%" :multiple="item.formConfig.multiple" :filterable="item.formConfig.filterable" :placeholder="`请选择${item.label}`">
                <el-option v-for="it in item.data" :key="it.key" :label="it.value" :value="it.key" />
              </el-select>
              <el-switch v-if="item.formConfig.type=='switch'" v-model="form[item.formConfig.name]" style="width:100%" :name="item.formConfig.name" />
              <el-date-picker v-if="item.formConfig.type=='date'" v-model="form[item.formConfig.name]" type="date" />
              <!-- <el-input v-if="item.formConfig.type=='textarea'" v-model="form[item.formConfig.name]" style="width:100%" :rows="5" type="textarea" /> -->
              <cdp-user-select-table v-if="item.formConfig.type=='user-select-table'" v-model="form[item.formConfig.name]" style="width:100%" />
              <cdp-select-table v-if="item.formConfig.type=='select-table'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :url="item.formConfig.url" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col v-if="index%2 == 1 && item.formConfig.type!=='textarea'" :span="12">
            <el-form-item v-if="!item.formConfig.hidden" :label="item.label" :prop="item.formConfig.name">
              <el-input v-if="item.formConfig.type=='input'" v-model="form[item.formConfig.name]" style="width:100%" :name="item.formConfig.name" :placeholder="`请输入${item.label}`" />
              <el-select v-if="item.formConfig.type=='select'" v-model="form[item.formConfig.name]" style="width:100%" :multiple="item.formConfig.multiple" :filterable="item.formConfig.filterable" :placeholder="`请选择${item.label}`">
                <el-option v-for="it in item.data" :key="it.key" :label="it.value" :value="it.key" />
              </el-select>
              <el-switch v-if="item.formConfig.type=='switch'" v-model="form[item.formConfig.name]" style="width:100%" :name="item.formConfig.name" />
              <el-date-picker v-if="item.formConfig.type=='date'" v-model="form[item.formConfig.name]" type="date" />
              <!-- <el-input v-if="item.formConfig.type=='textarea'" v-model="form[item.formConfig.name]" style="width:100%" :rows="5" type="textarea" /> -->
              <cdp-user-select-table v-if="item.formConfig.type=='user-select-table'" v-model="form[item.formConfig.name]" style="width:100%" />
              <cdp-select-table v-if="item.formConfig.type=='select-table'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :url="item.formConfig.url" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col v-if="item.formConfig.type=='textarea'" :span="24">
            <el-form-item v-if="!item.formConfig.hidden" :label="item.label" :prop="item.formConfig.name">
              <!-- <el-input v-if="item.formConfig.type=='input'" v-model="form[item.formConfig.name]" style="width:100%" :name="item.formConfig.name" :placeholder="`请输入${item.label}`" />
              <el-select v-if="item.formConfig.type=='select'" v-model="form[item.formConfig.name]" style="width:100%" :multiple="item.formConfig.multiple" :filterable="item.formConfig.filterable" :placeholder="`请选择${item.label}`">
                <el-option v-for="it in item.data" :key="it.key" :label="it.value" :value="it.key" />
              </el-select>
              <el-date-picker v-if="item.formConfig.type=='date'" v-model="form[item.formConfig.name]" type="date" /> -->
              <el-input v-if="item.formConfig.type=='textarea'" v-model="form[item.formConfig.name]" style="width:100%" :rows="5" type="textarea" />
              <!-- <cdp-user-select-table v-if="item.formConfig.type=='user-select-table'" v-model="form[item.formConfig.name]" style="width:100%" />
              <cdp-select-table v-if="item.formConfig.type=='select-table'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :url="item.formConfig.url" style="width:100%" /> -->
            </el-form-item>
          </el-col>
        </span>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeHandler">取 消</el-button>
      <el-button type="primary" @click="submitHandler">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import CdpSelectTable from '@/components/cdp-ui/CdpSelectTable'
import CdpUserSelectTable from '@/views/components/cdp-user-select-table'
import { fetchList } from '@/api/api'

export default {
  components: {
    CdpUserSelectTable,
    CdpSelectTable
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
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
    }
  },
  data() {
    // 设置formConfig默认值
    const formItems = this.columns.filter(item => item.formConfig ? !item.formConfig.hidden : true).map(item => {
      return {
        ...item,
        formConfig: {
          name: item.name,
          type: 'input',
          multiple: false,
          key: 'key',
          value: 'value',
          url: '',
          filterable: false,
          hidden: false,
          rules: [],
          ...item.formConfig
        }
      }
    })

    return {
      form: [...formItems].map(item => item.name).reduce((obj, cur, index) => {
        obj[cur] = ''
        return obj
      }, {}),
      rules: {},
      formItems
    }
  },
  created() {
    const rules = {}
    for (let i = 0; i < this.formItems.length; i++) {
      if (this.formItems[i].formConfig.rules.length > 0) {
        rules[this.formItems[i].formConfig.name] = this.formItems[i].formConfig.rules
      }
    }
    this.rules = rules
  },
  methods: {
    openHandler() {
      for (let i = 0; i < this.formItems.length; i++) {
        if (this.formItems[i].formConfig && this.formItems[i].formConfig.url && this.formItems[i].formConfig.type !== 'select-table') {
          fetchList({}, this.formItems[i].formConfig.url).then(({ data }) => {
            this.formItems[i].data = data.data.map(item => ({
              key: item[this.formItems[i].formConfig.key],
              value: item[this.formItems[i].formConfig.value]
            }))
            this.$forceUpdate() // 强制渲染
          })
        }
      }
    },
    closeHandler() {
      this.$emit('update:visible', !this.visible)
      this.$refs.form.resetFields()
    },
    submitHandler() {
      this.$refs.form.validate((error, errrorInfo) => {
        if (!error) {
          return
        }
        this.$emit('addHandler', this.form)
      })
    },
    resetHandler() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
