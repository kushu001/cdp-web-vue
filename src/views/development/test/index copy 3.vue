<template>
  <div style="width:40%">
    <cdp-select-icon />
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :default-checked-keys="bindIds"
      :props="defaultProps"
    />
  </div>
</template>
<script>
import CdpSelectIcon from '@/components/cdp-ui/CdpSelectIcon'
export default {
  components: {
    CdpSelectIcon
  },
  data() {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      bindIds: [9]
    }
  },
  created() {
  },
  methods: {}
}
</script>
