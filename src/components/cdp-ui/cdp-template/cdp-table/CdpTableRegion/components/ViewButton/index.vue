<template>
  <span v-permission="permission">
    <el-button type="text" size="small" @click="viewHandler">查 看</el-button>
    <cdp-view-desc :id="row.id" :visible.sync="drawer" :columns="columns" :title="title" :url="url.viewUrl" />
  </span>
</template>
<script>
import CdpViewDesc from './CdpViewDesc.vue'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  directives: { permission },
  components: {
    CdpViewDesc
  },
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: null
    },
    url: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    permission: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    viewHandler() {
      this.drawer = true
    }
  }
}
</script>
