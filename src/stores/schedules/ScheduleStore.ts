import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import moment from 'moment';
import type { ScheduleInterface } from '@/interfaces/schedule/ScheduleInterface';
import type { CalendarScheduleInterface } from '@/interfaces/schedule/CalendarScheduleInterface';
import { AnimalTypeEnum } from '@/enums/AnimalTypeEnum';

interface filterCalendar {
  month: string,
  year: string,
  animalType: AnimalTypeEnum
}

export const useScheduleStore = defineStore({
  id: 'prime_schedules',
  state: () => ({
    schedules: [] as ScheduleInterface[],
    schedule: null as ScheduleInterface,
    calendarSchedules: [] as CalendarScheduleInterface[],
    loading: false,
    filter: {
      month: moment().format('MM'),
      year: moment().format('YYYY'),
      animalType: AnimalTypeEnum._ALL
    } as filterCalendar
  }),
  actions: {
    async list () {
      this.loading = true

      await axios.get('schedules', {
        params: {
          month: this.filter.month,
          year: this.filter.year,
          type: this.filter.animalType
        }
      }).then(res => {
        this.schedules = res.data.data

        this.calendarSchedules = this.schedules.map(event => ({
          id: event.id,
          title: event.customer.name,
          start: event.scheduled_at,
          end: event.scheduled_at,
          color: '#184cc0',
          classNames: 'cursor-pointer font-weight-semibold',
          schedule: event,
        }))
      })

      this.loading = false
    },

    async store () {
      this.loading = true

      await axios.post('schedules', this.schedule).then(res => {
        this.schedule = res.data.data
        this.schedules.push(this.schedule)

        this.calendarSchedules.push({
          id: this.schedule.id,
          title: this.schedule.customer.name,
          start: this.schedule.scheduled_at,
          end: this.schedule.scheduled_at,
          color: '#184cc0',
          classNames: 'cursor-pointer font-weight-semibold',
          schedule: this.schedule,
        })
      }).catch(() => {
        this.loading = false

        throw new Error()
      })

      this.loading = false
    },

    async update () {
      this.loading = true

      await axios.put(`schedules/${this.schedule.id}`, this.schedule).then(res => {
        this.schedule = res.data.data
        let scheduleIndex = this.schedules.findIndex(s => s.id === this.schedule.id)

        this.schedules[scheduleIndex] = this.schedule
        let calendarIndex = this.calendarSchedules.findIndex(c => c.id == this.schedule.id)

        this.calendarSchedules[calendarIndex] = {
          id: this.schedule.id,
          title: this.schedule.customer.name,
          start: this.schedule.scheduled_at,
          end: this.schedule.scheduled_at,
          color: '#184cc0',
          classNames: 'cursor-pointer font-weight-semibold',
          schedule: this.schedule,
        }
      }).catch(() => {
        this.loading = false

        throw new Error()
      })

      this.loading = false
    },

    async delete() {
      this.loading = true

      await axios.delete(`schedules/${this.schedule.id}`).then(() => {
        let scheduleIndex = this.schedules.findIndex(s => s.id === this.schedule.id)
        this.schedules.splice(scheduleIndex, 1)

        let calendarIndex = this.calendarSchedules.findIndex(c => c.id == this.schedule.id)
        this.calendarSchedules.splice(calendarIndex, 1)
      }).catch(() => {
        this.loading = false

        throw new Error()
      })

      this.loading = false
    }
  }
});
