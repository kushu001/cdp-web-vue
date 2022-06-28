<template>
  <div class="page">
    <el-row>
      <cdp-search-region class="search" :conditions="columns" />
    </el-row>
    <el-row>
      <cdp-operation-region :title="title" :columns="columns" :url="url" />
    </el-row>
    <el-row>
      <cdp-table-region :title="title" :columns="columns" :url="url" />
    </el-row>
    <!-- <test /> -->
  </div>
</template>
<script>
import CdpSearchRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpSearchRegion'
import CdpOperationRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpOperationRegion'
import CdpTableRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion'
// import test from './test'

export default {
  components: {
    CdpSearchRegion,
    CdpOperationRegion,
    CdpTableRegion
    // ,test
  },
  data() {
    return {
      title: '岗位信息',
      url: '/api/v1/post',
      columns: [
        {
          name: 'name',
          label: '岗位名称'
        },
        {
          name: 'code',
          label: '岗位编码'
        },
        {
          name: 'create_time',
          label: '创建日期',
          formConfig: {
            hidden: true
          },
          searchConfig: {
            hidden: true
          }
        }
      ]
    }
  }
}
</script>
<style scoped>
/* .page {
  padding: 20px;
} */
</style>

