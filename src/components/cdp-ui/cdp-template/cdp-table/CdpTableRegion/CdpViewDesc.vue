<template>
  <el-drawer
    :title="title"
    :visible.sync="visible"
    :before-close="closeHandler"
    size="40%"
    @open="openHandler"
  >
    <el-descriptions class="desc" title="" :column="2" border>
      <el-descriptions-item v-for="item in columns" :key="item.name" label-style="width: 120px" content-style="width: 200px">
        <template slot="label">
          {{ item.label }}
        </template>
        <span v-if="item.type=='select'">
          <span v-if="!item.formConfig.multiple && item.data.find(it=>it.key==form[item.name]) ">
            <el-tag v-if="form[item.name] != null || form[item.name] != ''" :type="item.data.find(it=>it.key==form[item.name]).type" effect="plain">
              {{ item.data.find(it=>it.key==form[item.name]).value }}
            </el-tag>
          </span>
          <span v-else-if="form[item.name] != null && form[item.name] != ''">
            <el-tag v-for="(it, index) in form[item.name].split(',')" :key="index" :type="['success','info','warning','danger'][index % 4]" style="margin: 3px 3px">
              {{ it }}
            </el-tag>
          </span>
          <span v-else>
            {{ form[item.name] }}
          </span>
        </span>
        <span v-else-if="item.type=='switch'">
          <el-tag v-if="form[item.name]" :type="item.data.find(item=>item.key).type">{{ item.data.find(item=>item.key).value }}</el-tag>
          <el-tag v-else-if="!form[item.name]" :type="item.data.find(item=>!item.key).type">{{ item.data.find(item=>!item.key).value }}</el-tag>
        </span>
        <span v-else>{{ form[item.name] }}</span>
      </el-descriptions-item>
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
    return {
      form: [...this.columns].map(item => item.name).reduce((obj, cur, index) => {
        obj[cur] = ''
        return obj
      }, {}),
      rules: {}
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
