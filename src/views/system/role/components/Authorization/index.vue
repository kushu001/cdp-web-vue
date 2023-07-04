<template>
  <span>
    <el-button type="text" size="small" @click="authorizedDialog">授 权</el-button>
    <el-drawer title="授权" :visible.sync="drawer" :size="size" :append-to-body="true">
      <el-tabs tab-position="left" @tab-click="handlerTabs">
        <el-tab-pane label="菜单权限" style="margin-right:10px">
          <cdp-search-tree :key="keys.menuKey" v-model="menus" placeholder="输入关键字进行过滤" :props="{label:'title'}" url="/api/v1/menu/type/0" :show-checkbox="true" />
          <!-- <div class="footer">
            <el-row :gutter="20">
              <el-col :span="12" :offset="6"><el-button type="primary" @click="authorizedMenus">保存</el-button></el-col>
            </el-row>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="功能权限">
          <cdp-search-tree :key="keys.operationKey" v-model="operations" placeholder="输入关键字进行过滤" :props="{label:'title'}" url="/api/v1/menu/type/1" :show-checkbox="true" />
          <!-- <div class="footer">
            <el-row :gutter="20">
              <el-col :span="12" :offset="6"><el-button type="primary" @click="authorizedOperations">保存</el-button></el-col>
            </el-row>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="接口权限">
          <cdp-table v-if="index==='2'" v-model="resources" :table-config="tableConfig" />
        </el-tab-pane>
        <el-tab-pane label="数据权限">开发中...</el-tab-pane>
      </el-tabs>
      <div class="footer">
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="hanlderSave">保存</el-button>
        </el-row>
      </div>
    </el-drawer>
  </span>
</template>
<script>
import CdpSearchTree from '@/components/cdp-ui/CdpSearchTree'
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'
import { authorizedMenus, authorizedOperations, authorizedResources, menus, operations, resources } from '@/api/role'
export default {
  components: {
    CdpSearchTree,
    CdpTable
  },
  props: {
    row: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      drawer: false,
      size: '25%',
      menus: [],
      operations: [],
      resources: [],
      index: '0',
      keys: { menuKey: 1, operationKey: 1 },
      tableConfig: {
        title: '资源信息',
        url: '/api/v1/resource',
        flippingMemory: true,
        hOpn: {
          default: false
        },
        rOpn: {
          default: false
        },
        columns: [
          {
            name: 'name',
            label: '资源名称',
            formConfig: {
              rules: [{ required: true, message: '请输入资源名称', trigger: 'blur' }]
            }
          },
          {
            name: 'sign',
            label: '标识',
            formConfig: {
              rules: [{ required: true, message: '请输入标识', trigger: 'blur' }]
            }
          },
          {
            name: 'url',
            label: 'URL',
            formConfig: {
              rules: [{ required: true, message: '请输入URL', trigger: 'blur' }]
            }
          },
          {
            name: 'create_time',
            label: '创建时间',
            formConfig: {
              hidden: true
            },
            searchConfig: {
              hidden: true
            }
          }
        ]
      }
    }
  },
  methods: {
    handlerTabs(tab, event) {
      this.size = tab.index === '2' ? '50%' : '25%'
      this.index = tab.index
    },
    hanlderSave() {
      if (this.index === '0') {
        this.authorizedMenus()
      }
      if (this.index === '1') {
        this.authorizedOperations()
      }
      if (this.index === '2') {
        this.authorizedResources()
      }
    },
    async authorizedDialog() {
      this.drawer = true
      this.keys.menuKey += 1
      this.keys.operationKey += 1
      this.item = { ...this.row }
      const resMenus = await menus(this.item.id)
      if (resMenus.data.code === 200) {
        this.menus = resMenus.data.data
      }

      const resOperations = await operations(this.item.id)
      if (resOperations.data.code === 200) {
        this.operations = resOperations.data.data
      }

      const resResources = await resources(this.item.id)
      if (resResources.data.code === 200) {
        this.resources = resResources.data.data
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
    },
    async authorizedResources() {
      const res = await authorizedResources(this.item.id, { permissions: [...this.resources] })
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
.footer{
  margin-top: 20px;
}
</style>
