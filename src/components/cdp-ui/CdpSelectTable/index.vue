<template>
  <div>
    <el-input v-model="val" placeholder="请选择" class="input-with-select" :readonly="true">
      <el-button slot="prepend" icon="el-icon-refresh-left" title="重置" @click="reset()" />
      <el-button slot="append" icon="el-icon-search" @click="dialogTableVisible = true" />
    </el-input>
    <el-dialog :title="`选择${title}`" :fullscreen="true" width="1000px" :visible.sync="dialogTableVisible" :append-to-body="true" :before-close="handleClose">
      <el-card>
        <cdp-table ref="table" :table-config="tableConfig" @conformHandler="conformHandler" />
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
    columns: {
      type: Array,
      default: () => ([])
    },
    url: {
      type: String,
      default: null
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
      tableConfig: {
        hOpn: {
          default: false
        },
        rOpn: {
          default: [{ name: 'ConfirmButton' }]
        },
        url: this.url,
        columns: this.columns
      },
      val: '',
      dialogTableVisible: false
    }
  },
  watch: {
    value(val) {
      if (val) {
        get(`${this.url}/${val}`).then(({ data: res }) => {
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
    conformHandler(row) {
      this.val = row.name
      this.dialogTableVisible = false
      this.$emit('input', row.id)
    }
  }
}
</script>
