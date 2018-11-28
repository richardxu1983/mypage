import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name:"home",
      redirect: '/magicLand'
    },
    {
      path: '/about',
      name:"about",
      component: resolve => require(['@/views/about'], resolve)
    },
      {
      path: '/lifeGame',
      name:"lifeGame",
      component: resolve => require(['@/views/lifeGame'], resolve)
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
