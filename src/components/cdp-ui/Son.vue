<template>
  <grandson>
    <slot slot="slot1" name="slot2" record="我是插槽2" />
  </grandson>
</template>
<script>
import Grandson from '../cdp-ui/Grandson'
export default {
  components: {
    Grandson
  },
  data() {
    return {
    }
  }
}
</script>
