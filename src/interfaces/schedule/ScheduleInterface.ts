import { SchedulePeriodEnum } from '@/enums/SchedulePeriodEnum';
import type { CustomerInterface } from '@/interfaces/customer/CustomerInterface';
import type { CustomerAnimalInterface } from '@/interfaces/customer/CustomerAnimalInterface';
import type { UserInterface } from '@/interfaces/UserInterface';

export interface ScheduleInterface {
  id?: number,
  customer_id?: number,
  customer?: CustomerInterface,
  animal_id?: number,
  animal?: CustomerAnimalInterface
  doctor_id?: number,
  doctor?: UserInterface,
  scheduled_at: string
  symptoms: string
  period: SchedulePeriodEnum
}

export const emptySchedule: ScheduleInterface = {
  scheduled_at: '',
  symptoms: '',
  period: SchedulePeriodEnum._MORNING,
}
