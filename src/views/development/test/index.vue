<template>
  <div>
    <cdp-transfer-select v-model="value" :data="data" title="选择城市" />
  </div>
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
      value: [0, 1, 3, 4]
    }
  }
}
</script>
