<template>
  <cdp-select-table v-model="userId" :title="title" :table-config="tableConfig" style="width:200px" />
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
        url: '/api/v1/user',
        columns: [
          {
            name: 'name',
            label: '姓名'
          },
          {
            name: 'phone',
            label: '电话'
          },
          {
            name: 'dept_name',
            label: '部门',
            width: 200
          }
        ]
      },
      userId: this.value,
      title: '人员'
    }
  },
  watch: {
    userId(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.userId = val
    }
  }
}
</script>
