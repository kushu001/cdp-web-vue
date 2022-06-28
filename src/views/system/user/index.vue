<template>
  <el-container>
    <el-aside style="width:350px">
      <el-card>
        <el-form :inline="true" :model="formInline" class="tree-area">
          <el-form-item>
            <el-input
              v-model="filterText"
              style="width:250px"
              placeholder="输入公司/部门"
            />
          </el-form-item>
        </el-form>
        <el-tree ref="tree" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
      </el-card>
    </el-aside>
    <div style="width:70%">
      <el-card style="margin-top: 20px;">
        <el-row>
          <cdp-search-region class="search" :conditions="columns" />
        </el-row>
        <el-row>
          <cdp-operation-region :title="title" :columns="columns" :url="url.addUrl" />
        </el-row>
        <el-row v-if="url.queryUrl">
          <cdp-table-region :title="title" :columns="columns" :url="url" />
        </el-row>
        <!-- <test /> -->
      </el-card>
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
  name: 'User',
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
      url: {
        queryUrl: '',
        addUrl: '',
        editUrl: '',
        deleteUrl: ''
      },
      columns: [
        {
          name: 'name',
          label: '姓名'
        },
        {
          name: 'phone',
          label: '电话'
        },
        {
          name: 'company',
          label: '单位'
        },
        {
          name: 'address',
          label: '地址',
          width: 200
        },
        {
          name: 'create_time',
          label: '创建日期',
          width: 180,
          formConfig: {
            hidden: true
          },
          searchConfig: {
            hidden: true
          }
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
  beforeCreate() {
    fetchList({}, '/api/v1/org').then(({ data: response }) => {
      const { code, data } = response
      if (code === 200) {
        this.treeData = buildTree({
          data: data
        })
        this.url = {
          queryUrl: `/api/v1/user/org/${data[0].code}?v=${new Date().getTime()}`,
          addUrl: `/api/v1/user/org/${data[0].id}`,
          editUrl: `/api/v1/user`,
          deleteUrl: `/api/v1/org/${data[0].code}/user`
        }
      }
    })
  },
  created() {

  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleNodeClick(data) {
      this.url = {
        queryUrl: `/api/v1/user/org/${data['code']}?v=${new Date().getTime()}`,
        addUrl: `/api/v1/user/org/${data['id']}`,
        editUrl: `/api/v1/user`,
        deleteUrl: `/api/v1/org/${data['code']}/user`
      }
    },
    onSubmit() {

    }
  }
}
</script>
<style scoped>
/* aside{
  background: none;
} */

/* .tree-area{
  margin-top:11px;
} */
/* .page {
  padding: 20px;
} */
</style>
