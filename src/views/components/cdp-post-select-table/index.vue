<template>
  <cdp-select-table v-model="postId" :title="title" :table-config="tableConfig" style="width:200px" />
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
    return {
      tableConfig: {
        selection: false,
        hOpn: {
          default: false
        },
        rOpn: {
          default: [{ name: 'ConfirmButton' }]
        },
        url: '/api/v1/post',
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
      },
      postId: this.value,
      title: '岗位'
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
