import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Add from '@/components/Add'
import Wall from '@/components/Wall'
import MyList from '@/components/MyList'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/wall',
      name: 'Wall',
      component: Wall
    },
    {
      path: '/mylist',
      name: 'MyList',
      component: MyList
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
