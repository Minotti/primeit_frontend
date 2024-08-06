import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import type { CustomerInterface } from '@/interfaces/customer/CustomerInterface';
import type { CustomerAnimalInterface } from '@/interfaces/customer/CustomerAnimalInterface';

export const useCustomerStore = defineStore({
  id: 'prime_customer',
  state: () => ({
    customers: [] as CustomerInterface[],
    customer: null as CustomerInterface,
    animal: null as CustomerAnimalInterface,
    loading: false,
  }),
  actions: {
    async list () {
      this.loading = true

      await axios.get('customers').then(res => {
        this.customers = res.data.data
      })

      this.loading = false
    },

    async store () {
      this.loading = true

      await axios.post('customers', this.customer).then(res => {
        this.customer = res.data.data

        this.customers.push(this.customer)
      }).catch(() => {
        this.loading = false

        throw new Error()
      })

      this.loading = false
    },

    async storeAnimal () {
      this.loading = true

      await axios.post(`customers/${this.animal.customer_id}/animals`, this.animal).then(res => {
        this.animal = res.data.data
        this.customers.find(c => c.id === this.animal.customer_id).animals.push(this.animal)
      }).catch(() => {
        this.loading = false

        throw new Error()
      })

      this.loading = false
    }
  }
});
