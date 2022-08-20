<template>
  <div>
    <el-input
      v-model="filterText"
      :placeholder="placeholder"
    />
    <el-tree
      ref="tree"
      :data="treeData"
      node-key="id"
      :default-expanded-keys="defaultKeys"
      :show-checkbox="showCheckbox"
      :expand-on-click-node="false"
      :highlight-current="highlightCurrent"
      :props="defaultProps"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      @check="checkHandler"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span><i v-if="data.type==1" class="el-icon-key" /><i v-if="data.type==0" class="el-icon-orange" /> {{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import { buildTree } from '@/utils/tools'
import { fetchList } from '@/api/api'

export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    url: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    clickHanlder: {
      type: Function,
      default: () => ({})
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => ({})
    },
    defaultKeys: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      filterText: '',
      treeData: [],
      highlightCurrent: false,
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    url(val) {
      this.queryList(val)
    },
    defaultKeys(val) {
      this.$refs.tree.setCheckedKeys(val)
    }
  },
  created() {
    this.defaultProps = {
      ...this.defaultProps,
      ...this.props
    }
    this.queryList(this.url)
  },
  methods: {
    queryList(url) {
      fetchList({}, url).then(({ data: response }) => {
        if (response.code === 200) {
          this.highlightCurrent = false
          this.treeData = buildTree({
            data: response.data
          })
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleNodeClick(data, node) {
      delete data[this.defaultProps.children]
      this.highlightCurrent = !this.highlightCurrent
      if (this.highlightCurrent) {
        this.clickHanlder(data, node)
      } else {
        this.clickHanlder({}, node)
      }
    },
    checkHandler(data, { checkedKeys, halfCheckedKeys }) {
      this.$emit('input', { checkedKeys, halfCheckedKeys })
    }
  }
}
</script>
<style scoped>
  .el-tree {
    margin-top: 10px;
  }
</style>
