import pkg from './package'
import hooks from './hooks'

export default {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'preload', as: 'font', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,500,700' },
        ]
    },

    /*
   ** Redirect to router.base when not on root
   */
    // router: {
    //     base: '/login'
    // },
    // hooks: hooks(this),

    /*
  ** 
  */
    plugins: [{ src: '~/plugins/localStorage.js', ssr: false }],
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },

    /*
    ** Global CSS
    */
    css: [
        // SCSS file in the project
        '@/assets/scss/styles.scss'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
    ],

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        vendor: ['axios'],
        extend(config, ctx) {
        }
    }
}
