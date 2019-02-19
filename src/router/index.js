import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/pages/layout'
import Log from '@/pages/Log/Log'
import Codemirror from '@/pages/codemirror'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Log',
          component: Log
        },
        {
          path: '/codemirror',
          name: 'Codemirror',
          component: Codemirror
        }
      ]
    }
  ]
})
