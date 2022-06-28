<template>
  <el-select v-model="val" :placeholder="placeholder" filterable :filter-method="searchHandler" style="width:300px" @focus="hideHanlder">
    <el-option :label="option.label" :value="option.value" class="option">
      <el-tree ref="selectTree" :data="data" :filter-node-method="filterNode" :props="defaultProps" :highlight-current="clicked" @node-click="handleNodeClick" />
    </el-option>
  </el-select>
</template>
<script>
import { buildTree } from '@/utils/tools'
import { fetchList } from '@/api/api'

export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    url: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      val: '',
      option: {
        label: '',
        value: ''
      },
      clicked: false,
      data: [],
      arr: [],
      node: {},
      defaultProps: {
        label: 'name'
      }
    }
  },
  watch: {
    val(val) {
      this.$emit('input', this.node.id ? this.node.id : 0)
    },
    value(val) {
      if (val && val !== 0 && this.arr.length > 0) {
        this.node = this.arr.find(item => item.id === val)
        this.option.label = this.node[this.defaultProps.label]
        this.option.value = this.node.id
        this.val = this.node[this.defaultProps.label]
        this.clicked = true
      }
      if (!val || val === 0) {
        this.option.label = ''
        this.option.value = ''
        this.val = ''
        this.node = {}
        this.clicked = false
      }
    },
    url(val) {
      fetchList({}, this.url).then(({ data: response }) => {
        this.data = buildTree({
          data: response.data
        })
      })
    }
  },
  created() {
    if (this.value) {
      this.node = this.arr.find(item => item.id === this.value)
      this.option.label = this.node[this.defaultProps.label]
      this.option.value = this.node.id
      this.val = this.node[this.defaultProps.label]
      this.clicked = true
    }
    fetchList({}, this.url).then(({ data: response }) => {
      this.arr = response.data
      this.data = buildTree({
        data: response.data
      })
    })
  },
  methods: {
    searchHandler(val) {
      this.$refs.selectTree.filter(val)
      return false
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleNodeClick(data, node, obj) {
      if (!this.clicked || data.id !== this.option.value) {
        this.option.label = data[this.defaultProps.label]
        this.option.value = data.id
        this.val = data[this.defaultProps.label]
        this.node = data
        this.clicked = true
      } else {
        this.option.label = ''
        this.option.value = ''
        this.val = ''
        this.node = {}
        this.clicked = false
      }
    },
    hideHanlder() {
      this.searchHandler()
    }
  }
}
</script>
<style scoped>
.option {
  height: auto;
  background:white;
  font-weight:normal;
}
el-tree {
  font-size:14;
  font-weight:none;
}
</style>
