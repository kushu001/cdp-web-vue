<template>
  <el-form ref="searchForm" :inline="true" :model="searchForm">
    <span v-for="column in columns" :key="column.name">
      <el-form-item v-if="!column.searchHidden" :label="column.label" :prop="column.name">
        <el-input v-if="column.type=='input'" v-model="searchForm[column.name]" :name="column.name" :placeholder="`请输入${column.label}`" />
        <el-select v-if="column.type=='select'" v-model="searchForm[column.name]" :placeholder="`请选择${column.label}`">
          <el-option v-for="item in column.data" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
        <el-date-picker v-if="column.type=='date'" v-model="searchForm[column.name]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
    </span>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="onSearchHandler" @keyup.enter.native="onSearchHandler">查询</el-button>
      <el-button type="primary" plain @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    'columns': {
      type: Array,
      default: null
    },
    'callback': {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      'searchForm': {}
    }
  },
  methods: {
    onSearchHandler() {
      this.callback(this.searchForm)
    },
    onReset() {
      this.$refs.searchForm.resetFields()
      for (var key in this.searchForm) {
        if (Object.prototype.hasOwnProperty.call(this.searchForm, key)) {
          this.searchForm[key] = ''
        }
      }
    }
  }
}
</script>
