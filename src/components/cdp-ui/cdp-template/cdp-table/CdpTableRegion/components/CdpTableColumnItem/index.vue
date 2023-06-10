<script>
export default {
  name: 'CdpTableColumnItem',
  props: {
    render: {
      type: Function,
      default: null
    },
    record: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [Object, Number, String, Boolean],
      default: null
    }
  },
  render() {
    if (this.render) {
      return this.render(this.record, this.value)
    } else {
      return (<span>{ this.value}</span>)
    }
  }
}
</script>

