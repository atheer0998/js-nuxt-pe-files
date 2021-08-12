import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

<<<<<<< Updated upstream
const _1d18ffee = () => interopDefault(import('..\\pages\\account.vue' /* webpackChunkName: "pages/account" */))
const _0e3e8671 = () => interopDefault(import('..\\pages\\signin.vue' /* webpackChunkName: "pages/signin" */))
const _03751a53 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
=======
const _cce4381a = () => interopDefault(import('..\\pages\\account.vue' /* webpackChunkName: "pages/account" */))
const _334a8dcc = () => interopDefault(import('..\\pages\\signin.vue' /* webpackChunkName: "pages/signin" */))
const _1d6d3b98 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
>>>>>>> Stashed changes

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/account",
<<<<<<< Updated upstream
    component: _1d18ffee,
    name: "account"
  }, {
    path: "/signin",
    component: _0e3e8671,
    name: "signin"
  }, {
    path: "/",
    component: _03751a53,
=======
    component: _cce4381a,
    name: "account"
  }, {
    path: "/signin",
    component: _334a8dcc,
    name: "signin"
  }, {
    path: "/",
    component: _1d6d3b98,
>>>>>>> Stashed changes
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
