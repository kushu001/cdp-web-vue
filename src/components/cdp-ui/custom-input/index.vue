<template>
  <div>
    <p>这是一个自定义输入组件</p>
    <input ref="input" v-model="inputValue" @input="handleInput">
  </div>
</template>
<script>
import emitter from 'element-ui/src/mixins/emitter'
export default {
  mixins: [emitter], // 混入的方式 , 加载到当前组件
  props: {
    // valu:[String,Number],
    value: {
      type: [String, Number], // 由于绑定的属性值与v-model定义的prop一致, 两者选其一, v-model优先, value会被忽略
      default: null
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  // model:{ // 定义v-model如何去处理该组件 ,值属性定义、事件定义
  //   prop:"customValue",
  //   event:"custom"
  // },
  watch: {
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', [val]) // 值发生变化时, 向el-form-item分发事件 , 调用组件内部的校验流程
    }
  },
  mounted() {
    this.inputValue = this.value
  },
  methods: {
    /**
     * 处理输入, 如果不使用v-model则 父组件需要监听 cusmo 的事件,并更新 value 的值
     * 使用了 v-model, 则不用管了, v-model 根据model 定义的event事件类型, 监听事件, 进行值更新.
     **/
    handleInput(e) {
      console.log(this.inputValue)
      this.$emit('input', this.inputValue)
    }
  }
}
</script>
