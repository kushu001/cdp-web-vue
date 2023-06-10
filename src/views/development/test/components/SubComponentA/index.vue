<template>
  <div>
    <component :is="child" :columns="columns" />
  </div>
</template>

<script>
export default {
  props: {
    child: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      columns: [{
        name: 'hello'
      },
      {
        name: 'world'
      }]
    }
  }
}
</script>
