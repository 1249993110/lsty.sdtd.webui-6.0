import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NProgress from '../utils/nprogress';
import { storekey } from '../utils/request';

const routes = [
    {
        path: '/',
        redirect: '/live-players',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'live-players',
                name: 'LivePlayers',
                component: () => import('../views/LivePlayers.vue'),
            },
        ],
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '找不到页面',
        },
        component: () => import('../views/404.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        // 路由的懒加载,通过函数的形式,可以让项目中哪些不许一开始就要加载的组件,加载到项目中去
        // 只有浏览器跳转到当前路由时,该路由组件才会加载到项目中去
        // 这样做的好处是减少不必要的加载降低应用加载速度和运行带宽
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start();

    if (to.path === '/login') {
        localStorage.removeItem(storekey);
        next();
    } else if (!localStorage.getItem(storekey)) {
        next('/login');
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    // const keepAliveComponentsName = store.getters['keepAlive/keepAliveComponentsName'] || []
    // const name = to.matched[to.matched.length - 1].components.default.name
    // if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
    //     store.commit('keepAlive/addKeepAliveComponentsName', name)
    // }
    NProgress.done();
});

export default router;
