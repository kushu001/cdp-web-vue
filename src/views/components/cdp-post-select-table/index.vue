<template>
  <cdp-select-table v-model="postId" :title="title" :columns="columns" :url="url" style="width:200px" />
</template>
<script>
import CdpSelectTable from '@/components/cdp-ui/CdpSelectTable'

export default {
  components: {
    CdpSelectTable
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    console.log('post-table')
    return {
      url: '/api/v1/post',
      postId: this.value,
      title: '岗位',
      columns: [
        {
          name: 'name',
          label: '岗位名称'
        },
        {
          name: 'code',
          label: '岗位编码'
        }
      ]
    }
  },
  watch: {
    userId(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.postId = val
    }
  }
}
</script>
