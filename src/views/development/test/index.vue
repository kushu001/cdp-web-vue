<template>
  <div>
    <div v-for="(row, index) in tableData" :key="index">
      <sub-component-c v-for="(column, index2) in columns" :key="index2" :render="column.render" :item="row" :value="row[column.key]" />
    </div>
  </div>
</template>
<script>
import SubComponentC from './components/SubComponentC'
export default {
  components: {
    SubComponentC
  },
  data() {
    return {
      tableData: [
        { name: '张三' },
        { name: '李四' }
      ],
      columns: [
        {
          title: '姓名',
          key: 'name',
          render: (row) => {
            if (row.name === '张三') {
              return (<div style='color:red'>{ row.name} </div>)
            } else {
              return (<div style='color:blue'>{ row.name }</div>)
            }
          }
        }
      ]
    }
  }
}
</script>
