import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/Layout';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        component: () => import('@/views/Login')
    },
    {
        path: '/',
        component: () => import('@/views/Questionnaire'),
        meta: {
            title: '中正大學犯罪防治中心'
        }
    },
    {
        path: '/exam',
        component: () => import('@/views/Exam')
    },
    {
        path: '/admin',
        component: Layout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                // Document title tag
                // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
                meta: {
                    title: 'Dashboard',
                    requiresAuth: true
                },
                path: '/',
                name: 'home',
                component: Home
            },
            {
                meta: {
                    title: 'Tables',
                    requiresAuth: true
                },
                path: 'tables',
                name: 'tables',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "tables" */
                        '@/views/Tables.vue'
                    )
            },
            {
                meta: {
                    title: '題庫',
                    requiresAuth: true
                },
                path: 'questions',
                name: 'questions',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(/* webpackChunkName: "tables" */ '@/views/Question')
            },
            {
                meta: {
                    title: 'Forms',
                    requiresAuth: true
                },
                path: 'forms',
                name: 'forms',
                component: () =>
                    import(/* webpackChunkName: "forms" */ '@/views/Forms.vue')
            },
            {
                meta: {
                    title: 'Profile',
                    requiresAuth: true
                },
                path: 'profile',
                name: 'profile',
                component: () =>
                    import(
                        /* webpackChunkName: "profile" */
                        '@/views/Profile.vue'
                    )
            }
        ]
    }
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    }
});

export default router;
