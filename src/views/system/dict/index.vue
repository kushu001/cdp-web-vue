<template>
  <el-container>
    <el-aside>
      <el-card>
        <el-input v-model="query.param" placeholder="请输入编号/名称" size="small" style="width:188px;margin-bottom:10px">
          <el-button slot="append" icon="el-icon-search" @click="searchHandler" />
        </el-input>
        <el-button type="primary" size="small" @click="addDictHandler">新增</el-button>
        <el-button type="primary" size="small" @click="editDictHandler">修改</el-button>
        <el-button type="primary" size="small" plain @click="deleteDictHandler(tempFormData.id)">删除</el-button>
        <el-table ref="singleTable" :data="data" highlight-current-row tyle="width: 100%" @current-change="handleCurrentChange">
          <el-table-column prop="code" label="编号" width="width" />
          <el-table-column prop="name" label="字典名称" width="width" />
        </el-table>
        <el-pagination small :pager-count="5" layout="->, prev, pager, next" :current-page.sync="query.page" :total="query.total" @current-change="currentChangeHandler" @prev-click="preClickHandler" @next-click="nextClickHandler" />
        <el-dialog title="字典" :visible.sync="dialogFormVisible" width="350px" @open="open" @close="$refs['formData'].clearValidate()">
          <el-form ref="formData" :model="formData" :rules="rules" :inline="true" label-width="100px">
            <el-form-item label="字典编码" prop="code">
              <el-input v-model="formData.code" autocomplete="off" class="form-width" />
            </el-form-item>
            <el-form-item label="字典名称" prop="name">
              <el-input v-model="formData.name" autocomplete="off" class="form-width" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="formData.sort" autocomplete="off" class="form-width" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="saveDict(tempFormData.id)">保 存</el-button>
          </div>
        </el-dialog>
      </el-card>
    </el-aside>
    <el-main>
      <el-card v-if="tempFormData.id">
        <cdp-table :table-config="tableConfig" />
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import CdpTable from '@/components/cdp-ui/cdp-template/cdp-table'
import { fetchList, add, get, update, deleteById } from '@/api/dict'

export default {
  name: 'Dict',
  components: {
    CdpTable
  },
  data() {
    return {
      dialogFormVisible: false,
      tempDialogStatus: 'add',
      tempFormData: {},
      formData: {
        name: '',
        code: '',
        sort: 0
      },
      rules: {
        code: [
          { required: true, message: '请输入字典编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ]
      },
      tableConfig: {
        title: '字典项',
        url: '',
        columns: [
          {
            name: 'name',
            label: '字典项名称',
            formConfig: {
              rules: [
                { required: true, message: '请输入字典名称', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
              ]
            }
          },
          {
            name: 'code',
            label: '编码',
            formConfig: {
              rules: [
                { required: true, message: '请输入字典编码', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
              ]
            }
          },
          {
            name: 'value',
            label: '值',
            searchConfig: {
              hidden: true
            }
          },
          {
            name: 'sort',
            label: '排序',
            searchConfig: {
              hidden: true
            },
            formConfig: {
              type: 'number'
            }
          },
          {
            name: 'status',
            label: '状态',
            align: 'center',
            searchConfig: {
              hidden: true
            },
            formConfig: {
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
            name: 'create_time',
            type: 'date',
            label: '创建时间',
            width: 180,
            searchConfig: {
              hidden: true
            },
            formConfig: {
              hidden: true
            }
          }
        ]
      },
      checked: false,
      data: [],
      query: {
        page: 1,
        limit: 10,
        total: 0,
        param: null
      }
    }
  },
  created() {
    this.queryList(this.query)
  },
  methods: {
    queryList(query) {
      fetchList(query).then(response => {
        this.data = response.data.data.records
        this.query.total = response.data.data.total
        if (this.data.length > 0) {
          this.tempFormData = this.data[0]
          this.tableConfig.url = `/api/v1/dict/item/${this.tempFormData.id}`
          this.$refs.singleTable.setCurrentRow(this.data[0])
        }
      })
    },
    searchHandler() {
      this.queryList(this.query)
    },
    handleCurrentChange(val) {
      this.tempFormData = val
      this.tableConfig.url = `/api/v1/dict/item/${this.tempFormData.id}`
    },
    addDictHandler() {
      this.dialogFormVisible = true
      this.tempDialogStatus = 'add'
    },
    editDictHandler() {
      if (!this.tempFormData.id) {
        this.$message({
          type: 'warning',
          message: '请选择要修改的字典'
        })
      } else {
        this.dialogFormVisible = true
        this.tempDialogStatus = 'edit'
      }
    },
    deleteDictHandler(id) {
      if (id) {
        this.$confirm('确定删除该字典, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById(id).then(({ data }) => {
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.queryList(this.query)
            } else {
              this.$message({
                type: 'danger',
                message: '删除失败!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的字典'
        })
      }
    },
    saveDict(id) {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (this.tempDialogStatus === 'edit') {
            update(id, this.formData).then(response => {
              if (response.data.code === 200) {
                this.queryList(this.query)
              }
            })
          } else {
            delete this.formData.id
            add(this.formData).then(response => {
              if (response.data.code === 200) {
                this.queryList(this.query)
              }
            })
          }
          this.dialogFormVisible = false
        }
      })
    },
    open() {
      if (this.tempDialogStatus === 'edit') {
        this.$nextTick(function() {
          get(this.tempFormData.id).then(({ data: response }) => {
            if (response.code === 200) {
              this.formData = response.data
            }
          })
        })
      } else {
        this.$nextTick(function() {
          this.$refs['formData'].resetFields()
          // this.tempFormData = {}
        })
      }
    },
    currentChangeHandler(currentPage) {
      console.log(`当前页:${currentPage}`)
      this.query.page = currentPage
      this.queryList(this.query)
    },
    preClickHandler(currentPage) {
      console.log(`上一页:${currentPage}`)
      this.query.page = currentPage
      this.queryList(this.query)
    },
    nextClickHandler(currentPage) {
      console.log(`下一页:${currentPage}`)
      this.query.page = currentPage
      this.queryList(this.query)
    }
  }
}
</script>
<style scoped>
.form-width {
  width: 200px
}
</style>

