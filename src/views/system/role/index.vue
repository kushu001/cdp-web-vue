<template>
  <div class="page">
    <cdp-table :table-config="tableConfig">
      <template v-slot:tableOperations="slotProps">
        <el-button type="text" size="small" @click="authorizedDialog(slotProps)">授 权</el-button>
      </template>
    </cdp-table>
    <el-drawer title="授权" :visible.sync="drawer">
      <el-tabs tab-position="left">
        <el-tab-pane label="菜单权限" style="margin-right:10px">
          <cdp-search-tree :key="keys.menuKey" v-model="menus" placeholder="输入关键字进行过滤" :props="{label:'title'}" url="/api/v1/menu/type/0" :show-checkbox="true" />
          <div class="footer">
            <el-row :gutter="20">
              <el-col :span="12" :offset="6"><el-button type="primary" @click="authorizedMenus">保存</el-button></el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="功能权限">
          <cdp-search-tree :key="keys.operationKey" v-model="operations" placeholder="输入关键字进行过滤" :props="{label:'title'}" url="/api/v1/menu/type/1" :show-checkbox="true" />
          <div class="footer">
            <el-row :gutter="20">
              <el-col :span="12" :offset="6"><el-button type="primary" @click="authorizedOperations">保存</el-button></el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="接口权限">
          <cdp-table :table-config="resourceTableConfig" />
        </el-tab-pane>
        <el-tab-pane label="数据权限">数据权限</el-tab-pane> -->
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'
import { authorizedMenus, authorizedOperations, menus, operations } from '@/api/role'

export default {
  name: 'Role',
  components: {
    CdpTable,
    CdpSearchTree: resolve => require(['@/components/cdp-ui/CdpSearchTree'], resolve)
  },
  data() {
    return {
      menus: [],
      operations: [],
      keys: { menuKey: 1, operationKey: 1 },
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
            name: 'enabled',
            label: '是否启用',
            align: 'center',
            formConfig: {
              type: 'switch'
            },
            searchConfig: {
              type: 'select'
            },
            data: [
              { key: false, value: '禁用', type: 'info' },
              { key: true, value: '启用', type: 'success' }
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
      resourceTableConfig: {
        title: '资源信息',
        url: '/api/v1/resource',
        layout: ['search', 'table'],
        isOperationHidden: true,
        columns: [
          {
            name: 'name',
            label: '资源名称',
            searchConfig: {
              hidden: true
            },
            formConfig: {
              rules: [{ required: true, message: '请输入资源名称', trigger: 'blur' }]
            }
          },
          {
            name: 'url',
            label: 'URL',
            width: 150,
            searchConfig: {
              hidden: true
            },
            formConfig: {
              rules: [{ required: true, message: '请输入URL', trigger: 'blur' }]
            }
          },
          {
            name: 'sign',
            label: '标识',
            width: 150,
            formConfig: {
              rules: [{ required: true, message: '请输入标识', trigger: 'blur' }]
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
      this.keys.menuKey += 1
      this.keys.operationKey += 1
      this.item = { ...row }
      const resMenus = await menus(this.item.id)
      if (resMenus.data.code === 200) {
        this.menus = resMenus.data.data
      }

      const resOperations = await operations(this.item.id)
      if (resOperations.data.code === 200) {
        this.operations = resOperations.data.data
      }
    },
    async authorizedMenus() {
      const res = await authorizedMenus(this.item.id, { permissions: [...this.menus.map(item => item.id)] })
      if (res.data.code === 200) {
        this.$message({
          message: '授权成功',
          type: 'success'
        })
        this.drawer = false
      }
    },
    async authorizedOperations() {
      const res = await authorizedOperations(this.item.id, { permissions: [...this.operations.map(item => item.id)] })
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

