const AuthRoutes = {
    path: '/',
    meta: {
        requiresAuth: false
    },
    redirect: {
        name: 'dashboard'
    },
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    children: [
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/authentication/BoxedLogin.vue'),
            meta: {
                title: 'Login',
                redirectIfAuthenticated: true
            }
        }
    ]
};

export default AuthRoutes;
