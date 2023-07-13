<template>
  <div>
    <el-input v-model="inputValue" readonly>
      <el-button slot="append" icon="el-icon-search" @click="visible = true" />
    </el-input>
    <el-dialog v-el-drag-dialog :append-to-body="true" :modal-append-to-body="false" :visible.sync="visible" width="625px" :title="title">
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
    }
  },
  data() {
    return {
      visible: false,
      inputValue: this.value.map(item => this.data.filter(it => it.key === item)[0]).map(item => item.label).join(','),
      innerValue: this.value,
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
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
