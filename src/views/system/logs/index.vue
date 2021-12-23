<template>
  <el-container>
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
      title: '日志',
      columns: [
        {
          name: 'module',
          type: 'input',
          label: '模块名',
          width: 180,
          defaultValue: ''
        },
        {
          name: 'context',
          type: 'input',
          label: '错误内容'
        },
        {
          name: 'type',
          type: 'input',
          label: '来源',
          width: 180
        },
        {
          name: 'date',
          type: 'date',
          label: '创建日期',
          width: 180
        }
      ],
      tableData: []
    }
  }
}
</script>
