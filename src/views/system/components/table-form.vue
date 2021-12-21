<template>
  <span style="margin:0 10px">
    <!-- Form -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :before-close="closeHandler">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>

<script>
export default {
  props: {
    'dialogFormVisible': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: ''
      },
      formLabelWidth: '70px'
    }
  },
  methods: {
    closeHandler() {
      this.$emit('update:dialogFormVisible', !this.dialogFormVisible)
    }
  }
}
</script>
