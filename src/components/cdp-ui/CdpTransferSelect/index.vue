<template>
  <div>
    <el-input v-model="inputValue" readonly :placeholder="placeholder">
      <el-button slot="append" icon="el-icon-search" @click="visible = true" />
    </el-input>
    <el-dialog v-el-drag-dialog :append-to-body="true" :visible.sync="visible" width="625px" :title="title">
      <el-transfer
        v-model="value"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入关键字"
        :data="data"
        @change="handleChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import ElDragDialog from '@/directive/el-drag-dialog'
export default {
  directives: {
    ElDragDialog
  },
  props: {
    title: {
      type: String,
      default: null
    },
    value: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      visible: false,
      inputValue: this.value.length > 0 ? this.value.map(item => this.data.filter(it => it.key === item)[0]).map(item => item.label).join(',') : undefined,
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
      }
    }
  },
  watch: {
    value(val) {
      if (!val || val.length <= 0 || this.data.length <= 0 || !val[0]) {
        this.inputValue = ''
      } else if (this.data.length > 0) {
        this.inputValue = this.value.length > 0 ? this.value.map(item => this.data.filter(it => it.key === item)[0]).map(item => item.label).join(',') : undefined
      }
    },
    data(data) {
      if (!this.value || this.value.length <= 0 || data.length <= 0 || !this.value[0]) {
        this.inputValue = ''
      } else if (this.data.length > 0) {
        this.inputValue = this.value.length > 0 ? this.value.map(item => this.data.filter(it => it.key === item)[0]).map(item => item.label).join(',') : undefined
      }
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      this.inputValue = value.map(item => this.data.filter(it => it.key === item)[0]).map(item => item.label).join(',')
      this.$emit('input', value)
    }
  }
}
</script>
