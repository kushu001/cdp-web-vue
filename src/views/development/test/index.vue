<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="即时配送">
      <el-switch v-model="modelValue" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    modelProps: {
      type: String,
      default: 'role.test.test1'
    }
  },
  data() {
    return {
      form: {
        delivery: {
          value: false
        },
        role: {
          id: 1,
          name: '测试',
          test: {
            test1: ''
          }
        }
      }
    }
  },
  computed: {
    modelPropsArray() {
      return this.modelProps.split('.')
    },
    modelValue: {
      get() {
        return this.modelPropsArray.reduce((obj, key) => obj[key], this.form)
      },
      set(value) {
        let obj = this.form
        const keys = [...this.modelPropsArray]
        while (keys.length > 1) {
          const key = keys.shift()
          obj = obj[key]
        }
        obj[keys[0]] = value
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    }
  }
}
</script>
