<template>
  <div>
    <div v-for="(item, index) in columns" :key="index">
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

