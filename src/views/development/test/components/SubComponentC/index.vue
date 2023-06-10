<script>
export default {
  name: 'MyComponent',
  props: {
    render: {
      type: Function,
      default: null
    },
    item: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [Object, Number, String],
      default: null
    }
  },
  data() {
    return {
      message: 'Hello, World!'
    }
  },
  render() {
    console.log(this.value)
    if (this.render) {
      return this.render(this.item)
    } else {
      return (<span>{ this.value}</span>)
    }
  }
}
</script>

