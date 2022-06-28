<template>
  <son>
    <div slot="slot2" :slot-scope="record">
      <p>{{ record }}</p>
      <p>是真的吗？</p>
    </div>
  </son>
</template>
<script>
import Son from '@/components/cdp-ui/Son'
export default {
  components: { Son },
  data() {
    return {
      record: '年龄100岁'
    }
  }
}
</script>
