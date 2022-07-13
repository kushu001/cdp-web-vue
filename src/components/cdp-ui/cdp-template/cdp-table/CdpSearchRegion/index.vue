<template>
  <el-form ref="form" :inline="true" :model="form" class="cdp-form">
    <span v-for="condition in formItems" :key="condition.searchConfig.name">
      <el-form-item v-if="!condition.searchConfig.hidden" :label="condition.label" :prop="condition.searchConfig.name">
        <el-input v-if="condition.searchConfig.type=='input'" v-model="form[condition.searchConfig.name]" :name="condition.searchConfig.name" :placeholder="`请输入${condition.label}`" />
        <el-select v-if="condition.searchConfig.type=='select'" v-model="form[condition.searchConfig.name]" :placeholder="`请选择${condition.label}`">
          <el-option v-for="item in condition.data" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
        <el-date-picker v-if="condition.searchConfig.type=='date'" v-model="form[condition.searchConfig.name]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
    </span>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchHandler">查询</el-button>
      <el-button type="primary" plain @click="resetHandler">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    conditions: {
      type: Array,
      default: () => ([])
    },
    search: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    // 设置formConfig默认值
    const formItems = this.conditions.map(item => {
      return {
        ...item,
        searchConfig: {
          name: item.name,
          type: 'input',
          multiple: false,
          key: 'key',
          value: 'value',
          url: '',
          hidden: false,
          ...item.searchConfig
        }
      }
    })
    return {
      form: [...formItems].map(item => item.name).reduce((obj, cur, index) => {
        obj[cur] = ''
        return obj
      }, {}),
      formItems
    }
  },
  methods: {
    searchHandler() {
      this.search(this.form)
    },
    resetHandler() {
      this.$refs.form.resetFields()
      this.search(this.form)
    }
  }
}
</script>
<style>
.cdp-form{
  padding: 10px 20px 0 20px;
}
</style>
