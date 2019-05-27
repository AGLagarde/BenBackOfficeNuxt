import redirectRootToLogin from './route-redirect-login'

export default nuxtConfig => {
    const router = Reflect.has(nuxtConfig, 'router') ? nuxtConfig.router : {}
    const base = Reflect.has(router, 'base') ? router.base : '/login'

    return {
        /**
         * 'render:setupMiddleware'
         * {@link node_modules/nuxt/lib/core/renderer.js}
         */
        setupMiddleware(app) {
            app.use('/', redirectRootToLogin(base))
        }
    }
}