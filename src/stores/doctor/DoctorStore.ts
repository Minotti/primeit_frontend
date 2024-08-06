import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import type { UserInterface } from '@/interfaces/UserInterface';

export const useDoctorStore = defineStore({
  id: 'prime_doctor',
  state: () => ({
    doctors: [] as UserInterface[],
    loading: false,
  }),
  actions: {
    async list () {
      this.loading = true

      await axios.get('doctors').then(res => {
        this.doctors = res.data.data
      })

      this.loading = false
    },
  }
});
