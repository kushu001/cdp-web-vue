<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script>
import { fetchList } from '@/api/api'
export default {
  data() {
    return {
      options: {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      },
      value: ''
    }
  },
  async created() {
    const { data } = await fetchList({}, '/api/v1/role/all')
    const result = data.data.map(item => ({
      key: item['id'],
      value: item['name'],
      label: item['id']
    }))
    this.options.options = result
    console.log(result)
  }
}
</script>

