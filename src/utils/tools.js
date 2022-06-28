import Layout from '@/layout'

export function buildTree({ data, id = 'id', pid = 'pid', children = 'children' }) {
  // 深拷贝一份数据
  var copy = JSON.parse(JSON.stringify(data))
  // 创建一个存储数据的对象
  var obj = {}
  // 遍历数据，将数据所有数据添加到对象中，key为数据id，value为原数据对象
  copy.forEach((item, index) => {
    obj[item[id]] = item
  })
  // 创建一个最终返回的数组
  var res = []
  // 遍历数据开始处理
  copy.forEach(item => {
    // 将root数据添加进res数组， 因为数据使引用类型，子元素数据都会带过来，下面的循环会处理子元素数据
    if (item[pid] === 0) {
      res.push(item)
    }
    // 梳理子元素数据
    for (var key in obj) {
      // 当一层元素id 和 二层元素pId一致，那么，二层遍历的元素就是一层遍历元素的children
      if (item[id] === obj[key][pid]) {
        // 处理数据children
        if (item[children]) {
          item[children].push(obj[key])
        } else {
          item[children] = [obj[key]]
        }
      }
    }
  })
  return res
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

