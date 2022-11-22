<template>
  <div>
    <el-input v-model="val" placeholder="请选择" class="input-with-select" :readonly="true">
      <el-button slot="prepend" icon="el-icon-refresh-left" title="重置" @click="reset()" />
      <el-button slot="append" icon="el-icon-search" @click="dialogTableVisible = true" />
    </el-input>
    <el-dialog title="选择人员" :fullscreen="true" width="1000px" :visible.sync="dialogTableVisible" :append-to-body="true" :before-close="handleClose">
      <el-card>
        <cdp-search-region ref="search" :conditions="columns" :search="searchHandler" />
        <cdp-table-region ref="table" v-slot:default="slotProps" :columns="columns" :selection="false" :url="url" :operations="[]">
          <el-button type="primary" style="margin-left:10px" size="small" @click="confirm(slotProps.scope)">
            确 认
          </el-button>
        </cdp-table-region>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import { get } from '@/api/api'
export default {
  components: {
    CdpSearchRegion: () => import('@/components/cdp-ui/cdp-template/cdp-table/CdpSearchRegion'),
    CdpTableRegion: () => import('@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion')
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
    confirm({ row }) {
      this.val = row.name
      this.dialogTableVisible = false
      this.$emit('input', row.id)
    },
    reset() {
      this.val = null
      this.$emit('input', null)
    },
    handleClose() {
      this.$refs.search.resetHandler()
      this.dialogTableVisible = false
    }
  }
}
</script>
