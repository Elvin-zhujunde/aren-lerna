import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

import routes from './routes'

console.log(routes);
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, form, next) => {
    NProgress.start()
    next();
});
router.afterEach(() => {
    NProgress.done()
})
export default router

