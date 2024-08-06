/**
 * axios setup to use mock service
 */

import axios from 'axios';
import { router } from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useErrorsStore } from '@/stores/errorsStore';
import { toast } from 'vue3-toastify';
import { FORM_ERROR } from '@/utils/messages/generalMessages';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

const axiosServices = axios.create({
    baseURL: baseUrl
});

// Add a response interceptor
axiosServices.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // @ts-ignore
        const skipRoute = ['login'].includes(router.currentRoute.value.name);
        const { logout } = useAuthStore();

        if (error.response.data.message === 'Unauthorized' && [401, 403].includes(error.response.status) && !skipRoute) {
            logout();
        }

        if (error.response.status === 422) {
            const errorsStore = useErrorsStore();
            errorsStore.setErrors(error.response.data.data);

            toast.error(FORM_ERROR)
        }

        return Promise.reject(error);
    }
);

axiosServices.interceptors.request.use((request) => {
    const token = window.localStorage.prime_auth ? JSON.parse(window.localStorage.prime_auth).token : null;

    if (token) {
        // @ts-ignore
        request.headers['Authorization'] = 'Bearer ' + token;
    }

    return request;
});

export default axiosServices;
