<template>
  <div>
    <el-input v-model="val" placeholder="请选择" class="input-with-select" :readonly="true">
      <el-button slot="prepend" icon="el-icon-refresh-left" title="重置" @click="reset()" />
      <el-button slot="append" icon="el-icon-search" @click="dialogTableVisible = true" />
    </el-input>
    <el-dialog :title="`选择${title}`" :fullscreen="true" width="1000px" :visible.sync="dialogTableVisible" :append-to-body="true" :before-close="handleClose">
      <el-card>
        <cdp-table ref="table" :table-config="tableConfig" @confirmHandler="confirmHandler" />
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import { get } from '@/api/api'
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'
export default {
  components: {
    CdpTable
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    tableConfig: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: 'name'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      val: '',
      dialogTableVisible: false
    }
  },
  watch: {
    value(val) {
      if (val) {
        get(`${this.tableConfig.url}/${val}`).then(({ data: res }) => {
          if (res.code === 200) {
            const { data } = res
            this.val = data[this.name]
          }
        })
      } else {
        this.val = ''
      }
    }
  },
  created() {
    if (this.value) {
      get(`${this.tableConfig.url}/${this.value}`).then(({ data: res }) => {
        if (res.code === 200) {
          const { data } = res
          this.val = data[this.name]
        }
      })
    }
  },
  methods: {
    searchHandler(form) {
      this.$refs.table.searchHandler(form)
    },
    reset() {
      this.val = null
      this.$emit('input', null)
    },
    handleClose() {
      this.$refs.table.resetSearchForm()
      this.dialogTableVisible = false
    },
    confirmHandler(row) {
      this.val = row.name
      this.dialogTableVisible = false
      this.$emit('input', row.id)
    }
  }
}
</script>
