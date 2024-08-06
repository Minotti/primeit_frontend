import type { CustomerAnimalInterface } from '@/interfaces/customer/CustomerAnimalInterface';

export interface CustomerInterface {
  id?: number
  name?: string
  email?: string
  animals?: CustomerAnimalInterface[]
}

export const emptyCustomer: CustomerInterface = {
  name: '',
  email: ''
}
