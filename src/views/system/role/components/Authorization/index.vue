<template>
  <span>
    <el-button type="text" size="small" @click="authorizedDialog">授 权</el-button>
    <el-drawer title="授权" :visible.sync="drawer" :append-to-body="true">
      <el-tabs tab-position="left">
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
        <el-tab-pane label="接口权限">开发中...</el-tab-pane>
        <el-tab-pane label="数据权限">开发中...</el-tab-pane>
      </el-tabs>
      <div class="footer">
        <el-row :gutter="20">
          <el-col><el-button type="primary" @click="authorizedOperations">保存</el-button></el-col>
        </el-row>
      </div>
    </el-drawer>
  </span>
</template>
<script>
import CdpSearchTree from '@/components/cdp-ui/CdpSearchTree'
import { authorizedMenus, authorizedOperations, menus, operations } from '@/api/role'
export default {
  components: {
    CdpSearchTree
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
      menus: [],
      operations: [],
      keys: { menuKey: 1, operationKey: 1 }
    }
  },
  methods: {
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
