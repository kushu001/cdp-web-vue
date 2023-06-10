<template>
  <div>
    <sub-component-a :child="SubComponentB" />
  </div>
</template>
<script>
import SubComponentA from './components/SubComponentA'

export default {
  components: {
    SubComponentA
  },
  data() {
    const url = `/development/test/components/SubComponentB`
    const SubComponentB = (resolve) => require([`@/views${url}`], resolve)

    return {
      SubComponentB
    }
  }
}
</script>
