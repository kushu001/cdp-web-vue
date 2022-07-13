<template>
  <div class="page">
    <cdp-table :table-config="tableConfig">
      <template v-slot:tableOperations="slotProps">
        <el-button type="text" size="small" @click="authorizedDialog(slotProps)">授 权</el-button>
      </template>
    </cdp-table>
    <el-drawer title="授权" :visible.sync="drawer">
      <div style="margin: 20px;">
        <cdp-search-tree v-model="permissions" :default-keys="defaultKeys" placeholder="输入关键字进行过滤" :props="{label:'title'}" url="/api/v1/menu" :show-checkbox="true" />
        <div class="footer">
          <el-row :gutter="20">
            <el-col :span="12" :offset="6"><el-button type="primary" @click="authorized">保存</el-button></el-col>
          </el-row>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'
import { authorized, permission } from '@/api/role'

export default {
  name: 'Role',
  components: {
    CdpTable,
    CdpSearchTree: resolve => require(['@/components/cdp-ui/CdpSearchTree'], resolve)
  },
  data() {
    return {
      permissions: {
        checkedKeys: [],
        halfCheckedKeys: []
      },
      defaultKeys: [],
      tableConfig: {
        title: '角色',
        url: '/api/v1/role',
        columns: [
          {
            name: 'name',
            type: 'input',
            label: '角色名称',
            defaultValue: '',
            formConfig: {
              rules: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
            }
          },
          {
            name: 'code',
            type: 'input',
            label: '角色编码',
            defaultValue: '',
            formConfig: {
              rules: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
            }
          },
          {
            name: 'status',
            label: '状态',
            align: 'center',
            formConfig: {
              type: 'select'
            },
            searchConfig: {
              type: 'select'
            },
            data: [
              { key: 1, value: '新建', type: 'success' },
              { key: 2, value: '进行中', type: 'info' },
              { key: 3, value: '通过', type: 'warning' },
              { key: 4, value: '拒绝', type: 'danger' }
            ]
          },
          {
            name: 'remark',
            label: '备注',
            formConfig: {
              type: 'textarea'
            },
            searchConfig: {
              hidden: true
            }
          }
        ]
      },
      drawer: false
    }
  },

  methods: {
    async authorizedDialog({ row }) {
      this.drawer = true
      this.item = { ...row }
      this.defaultKeys = []
      const res = await permission(this.item.id)
      if (res.data.code === 200) {
        this.defaultKeys = res.data.data.map(item => item.menu_id)
        this.permissions['checkedKeys'] = this.defaultKeys
      }
    },
    async authorized() {
      const checkedKeys = this.permissions.checkedKeys.map(item => {
        return {
          menu_id: item,
          is_half_key: 0
        }
      })
      const halfCheckedKeys = this.permissions.halfCheckedKeys.map(item => {
        return {
          menu_id: item,
          is_half_key: 1
        }
      })
      const res = await authorized(this.item.id, { permissions: [...checkedKeys, ...halfCheckedKeys] })
      if (res.data.code === 200) {
        this.$message({
          message: '授权成功',
          type: 'success'
        })
        this.drawer = false
      }
    }
  }
}
</script>

<style scoped>
/* .page {
  padding: 20px;
} */
.footer{
  position: fixed;
  bottom: 20px;
  right: 220px;
}
</style>

