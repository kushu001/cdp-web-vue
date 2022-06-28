import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard', affix: true }
      }
    ]
  }//,
  // {
  //   path: '/system',
  //   component: Layout,
  //   name: 'System',
  //   redirect: '/system/user',
  //   meta: {
  //     title: '系统管理',
  //     icon: 'setting'
  //   },
  //   children: [
  //     {
  //       path: '/system/account',
  //       component: () => import('@/views/system/account/index'),
  //       name: 'Account',
  //       meta: { title: '账户管理', icon: 'user', noCache: true }
  //     },
  //     {
  //       path: 'user',
  //       component: () => import('@/views/system/user/index'),
  //       name: 'User',
  //       meta: { title: '用户管理', icon: 'people', noCache: true }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/system/role/index'),
  //       name: 'Role',
  //       meta: { title: '角色管理', icon: 'user-role', noCache: true }
  //     },
  //     {
  //       path: 'org',
  //       component: () => import('@/views/system/org/index'),
  //       name: 'Org',
  //       meta: { title: '部门管理', icon: 'org', noCache: true }
  //     },
  //     {
  //       path: 'menu',
  //       component: () => import('@/views/system/menu/index'),
  //       name: 'Menu',
  //       meta: { title: '菜单管理', icon: 'el-icon-menu', noCache: false }
  //     },
  //     {
  //       path: 'dict',
  //       component: () => import('@/views/system/dict/index'),
  //       name: 'Dict',
  //       meta: { title: '字典管理', icon: 'el-icon-notebook-2', noCache: false }
  //     },
  //     {
  //       path: 'post',
  //       component: () => import('@/views/system/post/index'),
  //       name: 'Post',
  //       meta: { title: '岗位管理', icon: 'example', noCache: false }
  //     },
  //     {
  //       path: 'log',
  //       component: () => import('@/views/system/log/index'),
  //       name: 'Log',
  //       meta: { title: '日志管理', icon: 'log', noCache: false }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
