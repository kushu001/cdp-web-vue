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
            name: 'code',
            label: '编码'
          },
          {
            name: 'name',
            label: '姓名'
          },
          {
            name: 'phone',
            label: '电话'
          },
          {
            name: 'org_names',
            label: '部门',
            width: 200,
            render: (record, value) => {
              return <div>
                {value ? value.split(',').map((item, index) => {
                  return <el-tag type={['success', 'info', 'warning', 'danger'][index % 4]} style='margin: 3px 3px'>
                    {item}
                  </el-tag>
                }
                ) : ''}
              </div>
            }
          },
          {
            name: 'post_names',
            label: '岗位',
            width: 200,
            render: (record, value) => {
              return <div>
                {value ? value.split(',').map((item, index) => {
                  return <el-tag type={['success', 'info', 'warning', 'danger'][index % 4]} style='margin: 3px 3px'>
                    {item}
                  </el-tag>
                }
                ) : ''}
              </div>
            }
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
