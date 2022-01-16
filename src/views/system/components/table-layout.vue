<template>
  <el-container>
    <el-main>
      <el-form ref="formInline" :inline="true" :model="formInline">
        <el-form-item v-for="column in columns" :key="column.name" :label="column.label" :prop="column.name">
          <el-input v-if="column.type=='input'" v-model="formInline[column.name]" :name="column.name" :placeholder="`请输入${column.label}`" />
          <el-select v-if="column.type=='select'" v-model="formInline.region" :placeholder="`请选择${column.label}`">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
          <el-date-picker v-if="column.type=='date'" v-model="formInline[column.name]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="primary" plain @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <slot name="operation-area" :operation="operation">
          <el-button size="mini" type="primary" @click="dialogAddFormVisible=true,opt='新增'">新增</el-button>
          <el-button size="mini" type="primary" plain>批量删除</el-button>
        </slot>
      </template>
    </el-main>
    <el-footer>
      <table-area-new :data="data" :columns="columns">
        <template v-slot:fixed-operation>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <slot name="table-operation-area" :scope="scope">
                <el-button type="text" size="small" @click="editFormHandler(scope.row)">
                  编辑
                </el-button>
                <el-button type="text" size="small">
                  删除
                </el-button>
              </slot>
            </template>
          </el-table-column>
        </template>
      </table-area-new>
      <el-main>
        <el-pagination :current-page.sync="currentPage" background layout="->, prev, pager, next, jumper, sizes, total" :total="listQuery.total" :page-size="10" :page-sizes="[10, 20, 30, 40]" @size-change="sizeChangeHandler" @current-change="currentChangeHandler" @prev-click="preClickHandler" @next-click="nextClickHandler" />
      </el-main>
      <slot name="form-add-area" :formAdd="formAdd">
        <!-- 弹窗 -->
        <table-form key="form-add" :dialog-form-visible.sync="dialogAddFormVisible" :columns="columns" :opt="opt" :title="title" />
      </slot>
      <slot name="form-edit-area" :formEdit="formEdit">
        <!-- 弹窗 -->
        <table-form key="form-edit" :dialog-form-visible.sync="dialogEditFormVisible" :columns="columns" :opt="opt" :title="title" />
      </slot>
    </el-footer>
  </el-container>
</template>

<script>
import TableAreaNew from '../components/table-area-new.vue'
import TableForm from '../components/table-form.vue'
export default {
  components: {
    TableAreaNew,
    TableForm
  },
  props: {
    'columns': {
      type: Array,
      default: null
    },
    'data': {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      currentPage: 1,
      listQuery: {
        page: 1,
        limit: 10,
        total: 101
      },
      formInline: {},
      search: 'search',
      operation: 'operation',
      table: 'table',
      formAdd: 'formAdd',
      formEdit: 'formEdit',
      formView: 'formView',
      dialogAddFormVisible: false,
      dialogEditFormVisible: false,
      opt: '新增',
      title: '字典'
    }
  },
  methods: {
    onReset() {
      this.$refs.formInline.resetFields()
    },
    editFormHandler(row) {
      console.log({ ...row })
    }
  }
}
</script>

