<template>
  <el-container>
    <el-aside>
      <el-form size="mini" :inline="true" :model="formInline" class="tree-area">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="公司/部门" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-tree :data="treeData" :expand-on-click-node="false" :props="defaultProps" @node-click="handleNodeClick" />
    </el-aside>
    <table-area :data="tableData" :columns="columns" :title="title" />
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
      tableData: [{
        id: 1,
        account: 'admin',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        account: 'admin',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        account: 'admin',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 4,
        account: 'admin',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      treeData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
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
  methods: {
    handleNodeClick(data) {
      console.log(data)
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
