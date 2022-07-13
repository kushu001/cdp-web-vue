<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" class="cdp-form">
      <span v-for="condition in formItems" :key="condition.searchConfig.name">
        <el-form-item v-if="!condition.searchConfig.hidden" :label="condition.label" :prop="condition.searchConfig.name">
          <el-input v-if="condition.searchConfig.type=='input'" v-model="form[condition.searchConfig.name]" :name="condition.searchConfig.name" :placeholder="`请输入${condition.label}`" />
          <el-select v-if="condition.searchConfig.type=='select'" v-model="form[condition.searchConfig.name]" :placeholder="`请选择${condition.label}`">
            <el-option v-for="item in condition.data" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
          <el-date-picker v-if="condition.searchConfig.type=='date'" v-model="form[condition.searchConfig.name]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
      </span>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchHandler">查询</el-button>
        <el-button type="primary" plain @click="resetHandler">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button-group>
        <el-button v-if="operations.includes('add')" type="success" size="mini" icon="el-icon-plus" @click="addDialogHandler">新增</el-button>
        <el-button v-if="operations.includes('delete')" type="primary" size="mini" icon="el-icon-delete" @click="deleteHandler">批量删除</el-button>
        <slot />
        <el-upload v-if="operations.includes('import')" action="" class="upload">
          <el-button type="primary" class="upload-button" size="mini" icon="el-icon-upload2">导入</el-button>
        </el-upload>
        <el-button v-if="operations.includes('export')" type="primary" size="mini" icon="el-icon-download">导出</el-button>
      </el-button-group>
      <!-- <cdp-add-form ref="child" :visible.sync="visible" :title="title" :url="url" :columns="columns" @addHandler="addHandler" /> -->
    </div>
    <div>
      <el-table :data="tableData" border row-key="id" @select="select" @select-all="selectAll">
        <el-table-column v-if="selection" type="selection" width="55" />
        <el-table-column v-for="column in columns" :key="column.name" :align="column.align" :prop="column.name" :label="column.label" :width="column.width">
          <template slot-scope="scope">
            <el-tag v-if="scope.row[column.name] && column.data && column.data.find(item=>item.key==scope.row[column.name]) && column.data.find(item=>item.key==scope.row[column.name]).type" size="medium" :type="column.data.find(item=>item.key==scope.row[column.name]).type">
              {{ column.data.find(item=>item.key==scope.row[column.name]).value }}
            </el-tag>
            <span v-else>{{ scope.row[column.name] }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <cdp-table-operation :scope="scope" :operations="operations" @deleteHandler="deleteHandler" @editDialogHandler="editDialogHandler">
              <slot slot="defaultOperation" :scope="scope" />
            </cdp-table-operation>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-if="pagination">
        <el-pagination :current-page.sync="paginationConfig.page" background layout="->, prev, pager, next, jumper, sizes, total" :total="paginationConfig.total" :page-size="paginationConfig.limit" :page-sizes="[10, 20, 30, 40]" @size-change="sizeChangeHandler" @current-change="currentChangeHandler" @prev-click="preClickHandler" @next-click="nextClickHandler" />
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    operations: {
      type: Array,
      default: () => (['add', 'delete', 'import', 'export'])
    },
    pagination: {
      type: [Boolean, Object],
      default: () => ({
        page: 1,
        limit: 10,
        total: 0
      })
    }
  },
  data() {
    // 设置formConfig默认值
    const formItems = this.columns.map(item => {
      return {
        ...item,
        searchConfig: {
          name: item.name,
          type: 'input',
          multiple: false,
          key: 'key',
          value: 'value',
          url: '',
          hidden: false,
          ...item.searchConfig
        }
      }
    })
    return {
      form: [...formItems].map(item => item.name).reduce((obj, cur, index) => {
        obj[cur] = ''
        return obj
      }, {}),
      formItems,
      paginationConfig: this.pagination
    }
  },
  methods: {
    searchHandler() {

    },
    resetHandler() {
      debugger
      this.$refs.form.resetFields()
    },
    addDialogHandler() {

    },
    deleteHandler() {

    }
  }
}
</script>
<style scoped>
.upload {
  float:left;
  margin-right:-1px;
}
.upload-button{
  border-radius:0px
}
</style>
