<template>
  <div>
    <el-input v-model="inputValue" readonly :placeholder="placeholder">
      <el-button slot="append" icon="el-icon-search" @click="visible = true" />
    </el-input>
    <el-dialog v-el-drag-dialog :append-to-body="true" :visible.sync="visible" width="625px" :title="title">
      <el-transfer
        v-model="innerValue"
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
      inputValue: this._filterDatas(this.value, this.data),
      innerValue: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
      }
    }
  },
  watch: {
    value(val) {
      this.inputValue = this._filterDatas(val, this.data)
    },
    data(data) {
      this.inputValue = this._filterDatas(this.value, data)
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      this.inputValue = this._filterDatas(value, this.data)
      this.$emit('input', value)
    },
    _filterDatas(value, data) {
      this.innerValue = value
      return value ? data.filter(it => value.includes(it.key)).map(item => item.label).join(',') : undefined
    }
  }
}
</script>
