const Mock = require('mockjs')

const List = []
const count = 101

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@cname',
    code: '@increment(1000)',
    date: '@date("yyyy-MM-dd")'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/roles/list',
    type: 'get',
    response: config => {
      const { name, code, page = 1, limit = 20 } = config.query

      let mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        if (code && item.code.toString().indexOf(code.toString()) < 0) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
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
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]

