import Layout from '@/layout'

export function buildTree({ data, id = 'id', pid = 'pid', children = 'children' }) {
  // * 先生成parent建立父子关系
  const obj = {}
  data.forEach((item) => {
    obj[item.id] = item
  })
  // * obj -> {1001: {id: 1001, parentId: 0, name: 'AA'}, 1002: {...}}
  // console.log(obj, "obj")
  const parentList = []
  data.forEach((item) => {
    const parent = obj[item[pid]]
    if (parent) {
      // * 当前项有父节点
      parent[children] = parent[children] || []
      parent[children].push(item)
    } else {
      // * 当前项没有父节点 -> 顶层
      parentList.push(item)
    }
  })
  return parentList
}

/**
 * 深度拷贝
 * @param {*} obj
 * @returns
 */
export function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}

/**
 * 查询树的所有叶子节点
 * @param {*} param0
 * @returns
 */
export function getAllLeaf({ data, children = 'children' }) {
  const result = []
  function getLeaf(data) {
    data.forEach(item => {
      if (!item[children]) {
        result.push(item)
      } else {
        getLeaf(item[children])
      }
    })
  }
  getLeaf(data)
  return result
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes (resolve: any) => require([`@/views/${view}.vue`], resolve)
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    if (!item.url) return
    const menu = {
      path: item.url,
      component: (item.url.split('/')).length - 1 === 1 ? Layout : (resolve) => require([`@/views${item.url}/index`], resolve),
      redirect: item.redirect,
      children: [],
      name: item.name,
      hidden: item.is_hidden,
      meta: {
        title: item.title,
        icon: item.icon
      }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

