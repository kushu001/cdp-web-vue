<template>
  <el-drawer
    :title="title"
    :visible.sync="visible"
    :before-close="closeHandler"
    size="40%"
    @open="openHandler"
  >
    <el-descriptions class="desc" title="" :column="2" border>
      <el-descriptions-item v-for="item in formItems" :key="item.name">
        <template slot="label">
          {{ item.label }}
        </template>
        {{ form[item.name] }}
      </el-descriptions-item>
      <!-- <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user" />
          用户名
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone" />
          手机号
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline" />
          居住地
        </template>
        苏州市
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets" />
          备注
        </template>
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building" />
          联系地址
        </template>
        江苏省苏州市吴中区吴中大道 1188 号
      </el-descriptions-item> -->
    </el-descriptions>
  </el-drawer>
</template>
<script>
import { get } from '@/api/api'

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    id: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    // 设置formConfig默认值
    const formItems = this.columns.map(item => {
      return {
        ...item,
        formConfig: {
          name: item.name,
          type: 'input',
          multiple: false,
          filterable: false,
          key: 'key',
          value: 'value',
          url: '',
          hidden: false,
          rules: [],
          ...item.formConfig
        }
      }
    })
    return {
      form: [...formItems].map(item => item.name).reduce((obj, cur, index) => {
        obj[cur] = ''
        return obj
      }, {}),
      rules: {},
      formItems
    }
  },
  methods: {
    closeHandler() {
      this.$emit('update:visible', !this.visible)
    },
    openHandler() {
      get(`${this.url}\\${this.id}`).then(({ data }) => {
        if (data.code === 200) {
          this.form = { ...data.data }
        } else {
          this.$message({
            type: 'error',
            message: '查询失败!'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.desc {
  margin: 0 20px 20px 20px
}
</style>
