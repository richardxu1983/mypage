import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name:"home",
      redirect: '/frontPage'
    },
    {
      path: '/about',
      name:"about",
      component: resolve => require(['@/views/about'], resolve)
    },
    {
      path: '/magicLand',
      name:"magicLand",
      component: resolve => require(['@/views/magicLand'], resolve)
    },
    {
      path: '/frontPage',
      name:"frontPage",
      component: resolve => require(['@/views/frontPage'], resolve)
    },
  ]
})
