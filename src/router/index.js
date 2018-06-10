import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store/index.js'

import Home from '@/views/home'
import Manage from '@/views/manage'
import Detail from '@/views/detail'
import Login from '@/views/login'

import BasicSource from '@/components/BasicSource'
import Survey from '@/components/Survey'
import Location from '@/components/Location'
import DiseaseData from '@/components/DiseaseData'
import InterventionData from '@/components/InterventionData'

const routes = [
  {
    path: '/home',
    component: Home,
    meta: { requireAuth: true },
    alias: '/'
  }, {
    path: '/manage',
    component: Manage,
    meta: { requireAuth: true }
  }, {
    path: '/detail',
    component: Detail,
    meta: { requireAuth: true },
    children: [{
      path: 'basicsource',
      meta: { requireAuth: true },
      component: BasicSource
    }, {
      path: 'survey',
      meta: { requireAuth: true },
      component: Survey
    }, {
      path: 'location',
      meta: { requireAuth: true },
      component: Location
    }, {
      path: 'disease',
      meta: { requireAuth: true },
      component: DiseaseData
    }, {
      path: 'intervention',
      meta: { requireAuth: true },
      component: InterventionData
    }]
  }, {
    path: '/login',
    component: Login
  }
]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.islogin) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
