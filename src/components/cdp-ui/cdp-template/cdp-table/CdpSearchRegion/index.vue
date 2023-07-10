<template>
  <el-form ref="form" :inline="true" :model="form" label-position="left" class="cdp-form" size="mini">
    <span v-for="condition in formItems" :key="condition.searchConfig.name">
      <el-form-item v-show="condition.searchConfig.isShow" :label="condition.label" :prop="condition.searchConfig.name">
        <el-input v-if="condition.searchConfig.type=='input'" v-model="form[condition.searchConfig.name]" :name="condition.searchConfig.name" :placeholder="`请输入${condition.label}`" />
        <el-select v-if="condition.searchConfig.type=='select'" v-model="form[condition.searchConfig.name]" :name="condition.searchConfig.name" :multiple="condition.searchConfig.multiple" :placeholder="`请选择${condition.label}`">
          <el-option v-for="item in condition.result" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
        <el-date-picker v-if="condition.searchConfig.type=='date'" v-model="form[condition.searchConfig.name]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
    </span>
    <el-form-item>
      <el-button v-if="formItems.length > 4" :icon="collapse? 'el-icon-arrow-down':'el-icon-arrow-up'" circle @click="collapseHandler" />
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
    },
    value: {
      type: Object,
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
    }).filter(item => !item.searchConfig.hidden).map((item, index) => {
      if ((index + 1) < 5) {
        item.searchConfig.isShow = true
      } else {
        item.searchConfig.isShow = false
      }
      return item
    })

    return {
      form: [...formItems].map(item => item.searchConfig.name).reduce((obj, cur, index) => {
        obj[cur] = ''
        return obj
      }, {}),
      formItems,
      collapse: true
    }
  },
  watch: {
    conditions: {
      handler: function() {
        console.log('obj改变了')
      },
      // 开启深度监听：只要obj中的任何一个属性发生改变，都会触发相应的代码
      deep: true
    }
  },
  async created() {
    for (let i = 0; i < this.formItems.length; i++) {
      if (this.formItems[i].formConfig && this.formItems[i].data) {
        this.formItems[i].result = await this.formItems[i].data()
      }
    }
    this.$forceUpdate()
  },
  methods: {
    searchHandler() {
      this.$emit('input', this.form)
      this.search(this.form)
    },
    changeHandler() {
      this.$emit('input', this.form)
    },
    resetHandler() {
      this.$refs.form.resetFields()
      this.search(this.form)
    },
    collapseHandler() {
      if (this.collapse) {
        this.formItems.map(item => {
          item.searchConfig.isShow = true
          return item
        })
      } else {
        this.formItems.map((item, index) => {
          if ((index + 1) < 5) {
            item.searchConfig.isShow = true
          } else {
            item.searchConfig.isShow = false
          }
          return item
        })
      }
      this.collapse = !this.collapse
    }
  }
}
</script>
<style>
.cdp-form{
  padding: 10px 20px 0 20px;
}
</style>
