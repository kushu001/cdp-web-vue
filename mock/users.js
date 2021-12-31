const Mock = require('mockjs')

const List = []
const count = 101

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    account: '@first',
    name: '@cname',
    address: '@county(true)',
    date: '@date("yyyy-MM-dd")'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/users/list',
    type: 'get',
    response: config => {
      const { account, name, address, page = 1, limit = 20 } = config.query

      let mockList = List.filter(item => {
        if (account && item.account.indexOf(account) < 0) return false
        if (name && item.name.indexOf(name) < 0 ) return false
        if (address && item.address.indexOf(address) < 0) return false
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
  }
]

