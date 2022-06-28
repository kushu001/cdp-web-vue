<template>
  <el-container>
    <el-aside>
      <el-form :inline="true" :model="formInline" class="tree-area">
        <el-form-item>
          <el-input
            v-model="filterText"
            placeholder="输入公司/部门"
          />
        </el-form-item>
      </el-form>
      <el-tree ref="tree" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
    </el-aside>
    <div class="page">
      <el-row>
        <cdp-search-region class="search" :conditions="columns" />
      </el-row>
      <el-row>
        <cdp-operation-region :title="title" :columns="columns" :url="`${url}${orgId}`" />
      </el-row>
      <el-row>
        <cdp-table-region :title="title" :default-checked-keys="defaultNode" :columns="columns" :url="`${url}${orgId}/user`" />
      </el-row>
      <!-- <test /> -->
    </div>
  </el-container>
</template>

<script>
import CdpSearchRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpSearchRegion'
import CdpOperationRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpOperationRegion'
import CdpTableRegion from '@/components/cdp-ui/cdp-template/cdp-table/CdpTableRegion'
import { fetchList } from '@/api/api'
import { buildTree } from '@/utils/tools'

export default {
  components: {
    CdpSearchRegion,
    CdpOperationRegion,
    CdpTableRegion
  },
  data() {
    return {
      filterText: '',
      formInline: {
        user: '',
        region: ''
      },
      title: '用户',
      url: '/api/v1/org/',
      orgId: '',
      columns: [
        {
          name: 'name',
          type: 'input',
          label: '姓名',
          width: 180
        },
        {
          name: 'address',
          type: 'input',
          label: '地址'
        },
        {
          name: 'create_time',
          type: 'date',
          label: '创建日期',
          width: 180,
          formHidden: true
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      tableData: [],
      treeData: [],
      defaultNode: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    fetchList({}, '/api/v1/org').then(({ data: response }) => {
      const { code, data } = response
      if (code === 200) {
        this.treeData = buildTree({
          data: data
        })
        debugger
        this.defaultNode.push(this.treeData[0]['id'])
      }
    })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data['id'])
      this.orgId = data['id']
    },
    onSubmit() {

    }
  }
}
</script>
<style scoped>
aside{
  background: none;
}

.tree-area{
  margin-top:11px;
}
.page {
  padding: 20px;
}
</style>
