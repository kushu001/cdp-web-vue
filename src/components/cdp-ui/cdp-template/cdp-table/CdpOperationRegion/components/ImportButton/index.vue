<template>
  <el-upload style="display: inline-block;margin:0 10px" action="#" :http-request="uploadHandler" :show-file-list="false" :headers="headers">
    <el-button type="primary" size="mini" icon="el-icon-upload2">导入</el-button>
  </el-upload>
</template>
<script>
import { importExcel } from '@/api/api'
import { getToken } from '@/utils/auth'
export default {
  props: {
    url: {
      type: Object,
      default: () => ({})
    },
    refreshTable: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      headers: {
        Authorization: getToken()
      }
    }
  },
  methods: {
    uploadHandler(params) {
      // 根据后台需求数据格式
      const form = new FormData()
      form.append('file', params.file)
      importExcel(form, `${this.url.queryUrl}/import`).then(res => {
        const blob = new Blob([res.data], { type: 'application/actet-stream;charset=utf-8' })
        if (blob.size === 0) {
          this.$message({
            type: 'success',
            message: '导入成功'
          })
        } else {
          this.$message.error('导入存在失败的数据')
          const contentDisposition = res.headers['content-disposition'] // 从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
          const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
          const result = patt.exec(contentDisposition)
          const filename = result[1]
          const downloadElement = document.createElement('a')
          const href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.style.display = 'none'
          downloadElement.href = href
          downloadElement.download = filename // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
        }
        this.refreshTable()
      })
    }
  }
}
</script>
