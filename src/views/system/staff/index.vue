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
        <cdp-table ref="table" :table-config="tableConfig" />
      </el-card>
    </div>
  </el-container>
</template>

<script>
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'
import { fetchList } from '@/api/api'
import { buildTree } from '@/utils/tools'

export default {
  name: 'Staff',
  components: {
    CdpTable
  },
  data() {
    return {
      id: -1,
      tableConfig: {
        title: '人员',
        url: {
          queryUrl: '',
          addUrl: '',
          editUrl: '',
          deleteUrl: '',
          viewUrl: ''
        },
        hOpn: {
          default: [
            { name: 'AddButton' },
            { name: 'BatchDeleteButton' }
          ]
        },
        rOpn: {
          default: [
            { name: 'ViewButton', permissions: ['system:user:view'] },
            { name: 'EditButton', permissions: ['system:user:edit'] },
            { name: 'DeleteButton', permissions: ['system:user:delete'] },
            { name: 'Audit', path: '/system/staff/components' }
          ]
        },
        columns: [
          {
            name: 'code',
            label: '编码',
            formConfig: {
              rules: [{ required: true, message: '请输入编码', trigger: 'blur' }]
            }
          },
          {
            name: 'name',
            label: '姓名',
            formConfig: {
              rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
            }
          },
          // {
          //   name: 'dept_name',
          //   label: '部门',
          //   width: 200,
          //   searchConfig: {
          //     hidden: true
          //   },
          //   formConfig: {
          //     hidden: true
          //   }
          // },
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
            name: 'email',
            label: 'Email',
            width: 200
          },
          {
            name: 'org_names',
            label: '部门',
            width: 300,
            formConfig: {
              name: 'org_ids',
              type: 'transfer-select',
              defaultValue: () => {
                return [this.id]
              }
            },
            data: async() => {
              let result = []
              const { data } = await fetchList({}, '/api/v1/org')
              result = data.data.map(item => ({
                key: item['id'],
                label: `${item['name']}(${item['code']})`
              }))
              return result
            },
            render: (record, value) => {
              return <div>
                {value.split(',').map((item, index) => {
                  return <el-tag type={['success', 'info', 'warning', 'danger'][index % 4]} style='margin: 3px 3px'>
                    {item}
                  </el-tag>
                }
                )}
              </div>
            }
          },
          {
            name: 'post_names',
            width: 200,
            formConfig: {
              name: 'post_ids',
              type: 'transfer-select'
            },
            label: '岗位',
            data: async() => {
              let result = []
              const { data } = await fetchList({}, '/api/v1/post/all')
              result = data.data.map(item => ({
                key: item['id'],
                label: `${item['name']}(${item['code']})`
              }))
              return result
            },
            render: (record, value) => {
              return <div>
                {value.split(',').map((item, index) => {
                  return <el-tag type={['success', 'info', 'warning', 'danger'][index % 4]} style='margin: 3px 3px'>
                    {item}
                  </el-tag>
                }
                )}
              </div>
            }
          },
          {
            name: 'address',
            label: '地址',
            width: 200
          },
          {
            name: 'home_address',
            label: '家庭地址',
            width: 200
          },
          {
            name: 'status',
            label: '状态',
            formConfig: {
              type: 'select',
              hidden: true
            },
            searchConfig: {
              type: 'select',
              hidden: true
            },
            render: ({ status }) => {
              return status ? <el-tag type='success' effect='dark'>通过</el-tag> : <el-tag type='info' effect='dark'>新建</el-tag>
            },
            data: () => [
              { key: 0, value: '新建', type: 'info' },
              { key: 1, value: '通过', type: 'success' }
            ]
          },
          {
            name: 'create_time',
            label: '创建时间',
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
      treeData: [],
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
          queryUrl: `/api/v1/user/org/${data[0].id}`,
          addUrl: `/api/v1/user/org/${data[0].id}`,
          editUrl: `/api/v1/user`,
          viewUrl: `/api/v1/user`,
          deleteUrl: `/api/v1/user`,
          exportUrl: `/api/v1/user/org/${data[0].id}`,
          importUrl: `/api/v1/user/org/${data[0].code}`
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
      this.id = data['id']
      this.tableConfig.url = {
        queryUrl: `/api/v1/user/org/${data['id']}`,
        addUrl: `/api/v1/user/org/${data['id']}`,
        editUrl: `/api/v1/user`,
        viewUrl: `/api/v1/user`,
        deleteUrl: `/api/v1/user`,
        exportUrl: `/api/v1/user/org/${data['id']}`,
        importUrl: `/api/v1/user/org/${data['code']}`
      }
    }
  }
}
</script>
