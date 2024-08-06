const MainRoutes = {
    path: '/',
    meta: {
        requiresAuth: true
    },
    redirect: '/',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'schedules',
            path: '/',
            meta: {
                headerTitle: 'Marcações',
            },
            component: () => import('@/views/admin/Schedules/Index.vue')
        }
    ]
};

export default MainRoutes;
