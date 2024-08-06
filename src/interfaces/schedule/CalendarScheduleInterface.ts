import type { ScheduleInterface } from '@/interfaces/schedules/ScheduleInterface';

export interface CalendarScheduleInterface {
  id?: number,
  title: string,
  start: string,
  end: string,
  color: string,
  schedule: ScheduleInterface,
  classNames?: string,
}
