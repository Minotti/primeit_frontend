import { defineStore } from 'pinia';
import { router } from '@/router';
import axios from '@/utils/axios';
import type { UserInterface } from '@/interfaces/UserInterface';

export const useAuthStore = defineStore({
  id: 'prime_auth',
  state: () => ({
    user: null as UserInterface,
    returnUrl: null,
    token: null,
    loading: false
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true;

      await axios.post('/auth/login', {
        email: email,
        password: password
      }).then((res) => {
        this.user = res.data.user;
        this.token = res.data.access_token;
        this.loading = false;

        router.push(this.returnUrl || '/');
      }).catch(() => {
        this.loading = false;
        throw new Error();
      });
    },

    logout() {
      this.token = null;
      this.returnUrl = router.currentRoute.value.path;

      localStorage.removeItem('user');
      router.push({ name: 'login' });

      this.user = null;
    }
  },
  getters: {
    role: (state) => state.user.role
  },
  persist: true
});
