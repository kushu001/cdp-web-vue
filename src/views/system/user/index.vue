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
        <cdp-table :table-config="tableConfig" />
      </el-card>
    </div>
  </el-container>
</template>

<script>
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'
import { fetchList } from '@/api/api'
import { buildTree } from '@/utils/tools'

export default {
  name: 'User',
  components: {
    CdpTable
  },
  data() {
    return {
      tableConfig: {
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
            label: '姓名',
            formConfig: {
              rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
            }
          },
          {
            name: 'dept_name',
            label: '部门',
            width: 200,
            searchConfig: {
              hidden: true
            }
          },
          {
            name: 'id_number',
            label: '身份证号',
            width: 200,
            formConfig: {
              rules: [
                { required: true, message: '请输入身份证', trigger: 'blur' },
                { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号' }
              ]
            }
          },
          {
            name: 'phone',
            label: '电话',
            width: 200
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
        ]
      },
      filterText: '',
      formInline: {
        user: '',
        region: ''
      },
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
        this.tableConfig.url = {
          queryUrl: `/api/v1/user/org/${data[0].code}`,
          addUrl: `/api/v1/user/org/${data[0].id}`,
          editUrl: `/api/v1/user`,
          deleteUrl: `/api/v1/org/${data[0].code}/user`
        }
      }
    })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    handleNodeClick(data) {
      this.tableConfig.url = {
        queryUrl: `/api/v1/user/org/${data['code']}`,
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
