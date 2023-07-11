<template>
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
    <el-row>
      <el-col :span="10">
        <el-form-item label="活动形式" size="mini">
          <el-input v-model="formLabelAlign.type" style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="选择人员" size="mini">
          <!-- <el-input v-model="formLabelAlign.type" style="width:100%">
            <el-button slot="prepend" icon="el-icon-refresh-left" size="default" title="重置" />
            <el-button slot="append" icon="el-icon-search" size="default" />
          </el-input> -->
          <cdp-post-select-table style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name" style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region" style="width:100%" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import CdpPostSelectTable from '@/views/components/cdp-post-select-table'
export default {
  components: {
    CdpPostSelectTable
  },
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  }
}
</script>
