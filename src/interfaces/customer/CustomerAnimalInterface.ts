import { AnimalTypeEnum } from '@/enums/AnimalTypeEnum';
import type { CustomerInterface } from '@/interfaces/customer/CustomerInterface';

export interface CustomerAnimalInterface {
  id?: number
  customer_id?: number
  name?: string
  age?: number
  type?: AnimalTypeEnum
}


export const emptyCustomerAnimal: CustomerInterface = {
  name: '',
  age: 1,
  type: AnimalTypeEnum._DOG
}
