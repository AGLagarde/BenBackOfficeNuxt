import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _20a17e7c = () => interopDefault(import('../pages/houses/index.vue' /* webpackChunkName: "pages/houses/index" */))
const _87c46044 = () => interopDefault(import('../pages/indexinitial.vue' /* webpackChunkName: "pages/indexinitial" */))
const _e9512826 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _92aa9ee2 = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _2ded223c = () => interopDefault(import('../pages/houses/create.vue' /* webpackChunkName: "pages/houses/create" */))
const _6a19ce59 = () => interopDefault(import('../pages/houses/invitation.vue' /* webpackChunkName: "pages/houses/invitation" */))
const _465fac0f = () => interopDefault(import('../pages/users/create.vue' /* webpackChunkName: "pages/users/create" */))
const _5ef98ab7 = () => interopDefault(import('../pages/users/_id.vue' /* webpackChunkName: "pages/users/_id" */))
const _7ca06e54 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/houses",
      component: _20a17e7c,
      name: "houses"
    }, {
      path: "/indexinitial",
      component: _87c46044,
      name: "indexinitial"
    }, {
      path: "/login",
      component: _e9512826,
      name: "login"
    }, {
      path: "/users",
      component: _92aa9ee2,
      name: "users"
    }, {
      path: "/houses/create",
      component: _2ded223c,
      name: "houses-create"
    }, {
      path: "/houses/invitation",
      component: _6a19ce59,
      name: "houses-invitation"
    }, {
      path: "/users/create",
      component: _465fac0f,
      name: "users-create"
    }, {
      path: "/users/:id",
      component: _5ef98ab7,
      name: "users-id"
    }, {
      path: "/",
      component: _7ca06e54,
      name: "index"
    }],

    fallback: false
  })
}
