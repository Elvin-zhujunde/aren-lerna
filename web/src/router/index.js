import { createRouter, createWebHistory } from "vue-router"
import NProgress from "nprogress"

const routes = [
    {
        path: "/",
        redirect: "/overview",
    },

    // {
    //     path: "/home",
    //     component: () => import("@/views/ThreeBuildHouse/index.vue"),
    //     meta: {
    //         title: "智居搭",
    //         describe: "智居搭",
    //     },
    // },
    // TODO:路由空状态
    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "NotFound",
    //     component: () => import("@/views/NotFound/NotFound.vue"),
    //     meta: {
    //         title: "NotFound",
    //     },
    // },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, form, next) => {
    NProgress.start()
    next()
})
router.afterEach(() => {
    NProgress.done()
})
export default router
export function getRoutes() {
    return routes
}
