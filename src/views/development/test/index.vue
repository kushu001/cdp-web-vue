<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="transfer" prop="org_ids">
      <cdp-transfer-select v-model="form.org_ids" :data="data" />
    </el-form-item>
    {{ form.org_ids }}
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import CdpTransferSelect from '@/components/cdp-ui/CdpTransferSelect'
export default {
  components: {
    CdpTransferSelect
  },
  data() {
    const generateData = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index
        })
      })
      return data
    }
    return {
      data: generateData(),
      form: {
        org_ids: []
      },
      rules: {
        org_ids: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      console.log(this.form)
      this.$refs['form'].resetFields()
    }
  }
}
</script>
