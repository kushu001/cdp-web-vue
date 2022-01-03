<template>
  <el-container>
    <el-aside>
      <el-form :inline="true" :model="formInline" class="tree-area">
        <el-form-item>
          <!-- <el-input v-model="formInline.user" placeholder="公司/部门" /> -->
          <el-input
            v-model="filterText"
            placeholder="输入公司/部门"
          />
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
      </el-form>
      <el-tree ref="tree" :filter-node-method="filterNode" :data="treeData" :expand-on-click-node="false" :props="defaultProps" @node-click="handleNodeClick" />
    </el-aside>
    <table-area :columns="columns" :title="title" :url="`/vue-element-admin/users/list/${1}`" />
  </el-container>
</template>

<script>
import TableArea from '../components/table-area'

export default {
  components: {
    TableArea
  },
  data() {
    return {
      filterText: '',
      formInline: {
        user: '',
        region: ''
      },
      title: '用户',
      columns: [
        {
          name: 'account',
          type: 'input',
          label: '账号',
          width: 180,
          defaultValue: ''
        },
        {
          name: 'name',
          type: 'input',
          label: '姓名',
          width: 180
        },
        {
          name: 'address',
          type: 'input',
          label: '地址'
        },
        {
          name: 'date',
          type: 'date',
          label: '创建日期',
          width: 180,
          formHidden: true
        }
      ],
      tableData: [],
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 2,
          label: '二级 1-1',
          children: [{
            id: 3,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        id: 11,
        label: '一级 2',
        children: [{
          id: 12,
          label: '二级 2-1',
          children: [{
            id: 13,
            label: '三级 2-1-1'
          }]
        }, {
          id: 14,
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        id: 21,
        label: '一级 3',
        children: [{
          id: 22,
          label: '二级 3-1',
          children: [{
            id: 23,
            label: '三级 3-1-1'
          }]
        }, {
          id: 31,
          label: '二级 3-2',
          children: [{
            id: 32,
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data['id'])
    },
    onSubmit() {

    }
  }
}
</script>
<style scoped>
aside{
  background: none;
}

.tree-area{
  margin-top:11px;
}
</style>
