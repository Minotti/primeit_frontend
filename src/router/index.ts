import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        MainRoutes,
        AuthRoutes
    ]
});

router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth: any = useAuthStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (authRequired && !auth.user) {
            auth.returnUrl = to.fullPath;
            return next({ name: 'login' });
        } else next();
    } else if (to.matched.some((record) => record.meta.redirectIfAuthenticated)) {
        if (auth.user) {
            return next({ name: 'dashboard' });
        } else next();
    } else {
        next();
    }
});

const DEFAULT_TITLE = 'PrimeIT';
router.afterEach((to, from) => {
    document.title = DEFAULT_TITLE + (to.meta.title ? ' - ' + to.meta.title : '');
});
