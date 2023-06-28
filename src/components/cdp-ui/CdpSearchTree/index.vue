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
      :style="`height: ${tableHeight}px; overflow:auto`"
      :default-expanded-keys="expandedKeys"
      :default-checked-keys="defaultKeys"
      :show-checkbox="showCheckbox"
      :expand-on-click-node="false"
      :highlight-current="highlightCurrent"
      :props="defaultProps"
      :accordion="accordion"
      :filter-node-method="filterNode"
      :default-expand-all="defaultExpandAll"
      @node-click="handleNodeClick"
      @check="checkHandler"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>
          <!-- <i v-if="data.type==1" class="el-icon-key" /><i v-if="data.type==0" class="el-icon-orange" /> -->
          <i :class="data.icon" />
          {{ node.label }}
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import { buildTree, getAllLeaf } from '@/utils/tools'
import { fetchList } from '@/api/api'

export default {
  props: {
    value: {
      type: Array,
      default: () => ([])
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
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    defaultExpandedKeys: {
      type: Array,
      default: () => ([])
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableHeight: window.innerHeight - 200,
      filterText: '',
      treeData: [],
      highlightCurrent: false,
      preKey: null,
      defaultKeys: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      expandedKeys: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    url(val) {
      this.queryList(val)
    },
    value(val) {
      const defaultTreeDatas = buildTree({
        data: val
      })
      this.defaultKeys = getAllLeaf({ data: defaultTreeDatas }).map(item => item.id)
      this.$refs.tree.setCheckedKeys(this.defaultKeys)
      this.expandedKeys = this.defaultKeys
      console.log('watch.....', this.expandedKeys)
    },
    defaultExpandedKeys(val) {
      this.expandedKeys = val
      // console.log(`watch2...:${this.expandedKeys}`)
    }
  },
  created() {
    this.defaultProps = {
      ...this.defaultProps,
      ...this.props
    }
    this.expandedKeys = this.defaultExpandedKeys.length > 0 ? this.defaultExpandedKeys : this.defaultKeys
    // console.log("created.....",this.expandedKeys)
    this.queryList(this.url)
  },
  mounted() {
    // 注：window.onresize只能在项目内触发1次
    window.addEventListener('resize', () => {
      this.tableHeight = window.innerHeight - 200
    })
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
      if (this.preKey === node.key) {
        this.highlightCurrent = !this.highlightCurrent
      } else {
        this.highlightCurrent = true
      }
      this.preKey = node.key
      if (this.highlightCurrent) {
        this.clickHanlder(data, node, this.highlightCurrent)
      } else {
        this.clickHanlder({}, node, this.highlightCurrent)
      }
    },
    checkHandler(data, { checkedKeys, halfCheckedKeys }) {
      const allKeys = [...checkedKeys, ...halfCheckedKeys]
      const allDatas = allKeys.map(i => {
        const node = this.$refs.tree.getNode(i)
        const obj = {
          'id': node.data.id,
          'pid': node.data.pid
        }
        return obj
      })

      this.$emit('input', allDatas)
    }
  }
}
</script>
<style scoped>
  .el-tree {
    margin-top: 10px;
  }
</style>
