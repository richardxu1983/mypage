import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/pc_index'
    },
    {
      path: "/pc_index", // pc端首页
      component: resolve => require(['@/components/pc_root'], resolve),
      children:[
          {
            path: '/test',
            component: resolve => require(['@/views/test'], resolve)
          }
      ]
    },
    {
      path: '/m_index', // 手机端首页
      component: resolve => require(['@/components/m_root'], resolve)
    },

  ]
})
