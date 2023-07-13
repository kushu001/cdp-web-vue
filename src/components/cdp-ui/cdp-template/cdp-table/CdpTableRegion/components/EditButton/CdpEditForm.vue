<template>
  <el-dialog v-el-drag-dialog :title="`修改${title}`" :append-to-body="true" :visible.sync="visible" :before-close="closeHandler" @opened="openHandler">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="mini">
      <el-row>
        <span v-for="(item, index) in columns" :key="index">
          <el-col v-if="index%2 == 0 && item.formConfig.type!=='textarea'" :span="12">
            <el-form-item v-if="!item.formConfig.hidden" :label="item.label" :prop="item.formConfig.name">
              <el-input v-if="item.formConfig.type=='input'" v-model="form[item.formConfig.name]" :disabled="!item.formConfig.edit?false:!item.formConfig.edit.disabled?false:true" style="width:100%" :name="item.formConfig.name" :placeholder="`请输入${item.label}`" />
              <el-input-number v-if="item.formConfig.type=='number'" v-model="form[item.formConfig.name]" :disabled="!item.formConfig.edit?false:!item.formConfig.edit.disabled?false:true" style="width:100%" :name="item.formConfig.name" :placeholder="`请输入${item.label}`" />
              <el-select v-if="item.formConfig.type=='select'" v-model="form[item.formConfig.name]" :disabled="!item.formConfig.edit?false:!item.formConfig.edit.disabled?false:true" style="width:100%" :multiple="item.formConfig.multiple" :filterable="item.formConfig.filterable" :placeholder="`请选择${item.label}`">
                <el-option v-for="it in item.result" :key="it.key" :label="it.value" :value="it.key" />
              </el-select>
              <el-switch v-if="item.formConfig.type=='switch'" v-model="form[item.formConfig.name]" style="width:100%" :name="item.formConfig.name" />
              <el-date-picker v-if="item.formConfig.type=='date'" v-model="form[item.formConfig.name]" :disabled="!item.formConfig.edit?false:!item.formConfig.edit.disabled?false:true" type="date" />
              <!-- <el-input v-if="item.formConfig.type=='textarea'" v-model="form[item.formConfig.name]" :disabled="item.formConfig.updateDisabled" style="width:100%;" :rows="5" type="textarea" /> -->
              <cdp-user-select-table v-if="item.formConfig.type=='user-select-table'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :url="item.formConfig.url" style="width:100%" />
              <cdp-post-select-table v-if="item.formConfig.type=='post-select-table'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :url="item.formConfig.url" style="width:100%" />
              <cdp-transfer-select v-if="item.formConfig.type=='transfer-select'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :data="item.result" :title="`选择${item.label}`" />
              <cdp-select-table v-if="item.formConfig.type=='select-table'" v-model="form[item.formConfig.name]" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col v-else-if="index%2 == 1 && item.formConfig.type!=='textarea'" :span="12">
            <el-form-item v-if="!item.formConfig.hidden" :label="item.label" :prop="item.formConfig.name">
              <el-input v-if="item.formConfig.type=='input'" v-model="form[item.formConfig.name]" :disabled="!item.formConfig.edit?false:!item.formConfig.edit.disabled?false:true" style="width:100%" :name="item.formConfig.name" :placeholder="`请输入${item.label}`" />
              <el-input-number v-if="item.formConfig.type=='number'" v-model="form[item.formConfig.name]" :disabled="!item.formConfig.edit?false:!item.formConfig.edit.disabled?false:true" style="width:100%" :name="item.formConfig.name" :placeholder="`请输入${item.label}`" />
              <el-select v-if="item.formConfig.type=='select'" v-model="form[item.formConfig.name]" :disabled="!item.formConfig.edit?false:!item.formConfig.edit.disabled?false:true" style="width:100%" :multiple="item.formConfig.multiple" :filterable="item.formConfig.filterable" :placeholder="`请选择${item.label}`">
                <el-option v-for="it in item.result" :key="it.key" :label="it.value" :value="it.key" />
              </el-select>
              <el-switch v-if="item.formConfig.type=='switch'" v-model="form[item.formConfig.name]" style="width:100%" :name="item.formConfig.name" />
              <el-date-picker v-if="item.formConfig.type=='date'" v-model="form[item.formConfig.name]" :disabled="!item.formConfig.edit?false:!item.formConfig.edit.disabled?false:true" type="date" />
              <!-- <el-input v-if="item.formConfig.type=='textarea'" v-model="form[item.formConfig.name]" :disabled="item.formConfig.updateDisabled" style="width:100%;" :rows="5" type="textarea" /> -->
              <cdp-user-select-table v-if="item.formConfig.type=='user-select-table'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :url="item.formConfig.url" style="width:100%" />
              <cdp-post-select-table v-if="item.formConfig.type=='post-select-table'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :url="item.formConfig.url" style="width:100%" />
              <cdp-transfer-select v-if="item.formConfig.type=='transfer-select'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :data="item.result" :title="`选择${item.label}`" />
              <cdp-select-table v-if="item.formConfig.type=='select-table'" v-model="form[item.formConfig.name]" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col v-if="item.formConfig.type=='textarea'" :span="24">
            <el-form-item v-if="!item.formConfig.hidden" :label="item.label" :prop="item.formConfig.name">
              <!-- <el-input v-if="item.formConfig.type=='input'" v-model="form[item.formConfig.name]" :disabled="item.formConfig.updateDisabled" style="width:100%" :name="item.formConfig.name" :placeholder="`请输入${item.label}`" />
              <el-select v-if="item.formConfig.type=='select'" v-model="form[item.formConfig.name]" :disabled="item.formConfig.updateDisabled" style="width:100%" :multiple="item.formConfig.multiple" :filterable="item.formConfig.filterable" :placeholder="`请选择${item.label}`">
                <el-option v-for="it in item.data" :key="it.key" :label="it.value" :value="it.key" />
              </el-select>
              <el-date-picker v-if="item.formConfig.type=='date'" v-model="form[item.formConfig.name]" :disabled="item.formConfig.updateDisabled" type="date" /> -->
              <el-input v-if="item.formConfig.type=='textarea'" v-model="form[item.formConfig.name]" :disabled="!item.formConfig.edit?false:!item.formConfig.edit.disabled?false:true" style="width:100%;" :rows="5" type="textarea" />
              <!-- <cdp-user-select-table v-if="item.formConfig.type=='user-select-table'" v-model="form[item.formConfig.name]" :columns="item.formConfig.columns" :url="item.formConfig.url" style="width:100%" />
              <cdp-select-table v-if="item.formConfig.type=='select-table'" v-model="form[item.formConfig.name]" style="width:100%" /> -->
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
import CdpPostSelectTable from '@/views/components/cdp-post-select-table'
import CdpTransferSelect from '@/components/cdp-ui/CdpTransferSelect'
import { get } from '@/api/api'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  components: {
    CdpUserSelectTable,
    CdpSelectTable,
    CdpPostSelectTable,
    CdpTransferSelect
  },
  directives: {
    elDragDialog
  },
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
    return {
      form: [...this.columns].reduce((obj, cur, index) => {
        obj[cur['name']] = cur['type'] === 'switch' ? false : ''
        return obj
      }, {}),
      rules: {}
    }
  },
  created() {
    const rules = {}
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].formConfig.rules.length > 0) {
        rules[this.columns[i].formConfig.name] = this.columns[i].formConfig.rules
      }
    }
    this.rules = rules
  },
  methods: {
    async openHandler() {
      get(`${this.url}\\${this.id}`).then(({ data }) => {
        if (data.code === 200) {
          this.form = { ...data.data }
        } else {
          this.$message({
            type: 'error',
            message: '查询失败!'
          })
        }
      })
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].formConfig && this.columns[i].data) {
          this.columns[i].result = await this.columns[i].data()
        }
      }
      this.$forceUpdate()
    },
    closeHandler() {
      this.$emit('update:visible', !this.visible)
      this.resetHandler()
    },
    submitHandler() {
      this.$refs.form.validate((error, errrorInfo) => {
        if (!error) {
          return
        }
        this.$emit('editHandler', this.form)
      })
    },
    resetHandler() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style scoped>
.el-input {
  font-size: 14px;
}
</style>
