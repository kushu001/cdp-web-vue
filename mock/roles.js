const Mock = require('mockjs')

const List = []
const count = 101

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@cname',
    code: '@increment(1000)',
    date: '@date("yyyy-MM-dd")',
    status: Mock.mock({
      'number|1-4': 4
    }).number
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/roles/list',
    type: 'get',
    response: config => {
      const { name, code, status, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        // 下面注掉的语句好奇怪，明明相等的两个数字，却判断是不相等，何原因？
        // console.log(item.status, "和", Number(status)," 是否相等:", parseInt(item.satus) !== parseInt(status))
        if (name && item.name.indexOf(name) < 0) return false
        if (code && item.code.toString().indexOf(code.toString()) < 0) return false
        if (status && parseInt(item.status) !== parseInt(status)) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/roles/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 200,
      data: {
        status: 'success'
      }
    }
  }
]

