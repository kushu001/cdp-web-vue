const Mock = require('mockjs')

const List = []
const count = Mock.mock('@integer(1,10)')

for (let i = 0; i < count; i++) {
  

  let item = Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name:'部门'+'@cword("一二三四五六七八九十")',
    code: 'D@string("number", 5)',
    leader: '@first',
    date: '@date("yyyy-MM-dd")',
    children: []
  })

  let count_children = Mock.mock('@integer(1,10)')
  for (let j = 0; j < count_children; j++) {
    let item_child = Mock.mock({
      id: '@increment',
      timestamp: +Mock.Random.date('T'),
      name:'部门'+'@cword("一二三四五六七八九十")',
      code: 'D@string("number", 5)',
      leader: '@first',
      date: '@date("yyyy-MM-dd")'
    })

    item.children.push(item_child)
  }

  List.push(item)


}

module.exports = [
  {
    url: '/vue-element-admin/orgs/list',
    type: 'get',
    response: config => {
      const { name, code, leader, page = 1, limit = 20 } = config.query

      let mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        if (code && item.code.toString().indexOf(code.toString()) < 0) return false
        if (leader && item.leader.indexOf(leader) < 0) return false
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
    url: '/vue-element-admin/orgs/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 200,
      data: {
        status: 'success'
      }
    }
  }
]

