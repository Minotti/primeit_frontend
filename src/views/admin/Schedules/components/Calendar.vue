<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import ptLocale from '@fullcalendar/core/locales/pt'

import { computed, onMounted, reactive, ref } from 'vue';
import { format } from 'date-fns';
import { useScheduleStore } from '@/stores/schedules/ScheduleStore';
import { storeToRefs } from 'pinia';
import { SchedulePeriodEnum } from '@/enums/SchedulePeriodEnum';
import moment from 'moment';
import { isDoctor } from '@/utils/userRole';
import { firstAndLastName, firstName } from '@/utils/helpers';
import { AnimalTypeEnum } from '@/enums/AnimalTypeEnum';
import { makeAutocomplete } from '@/utils/makeAutocomplete';

const scheduleStore = useScheduleStore()
const { filter, calendarSchedules, schedule } = storeToRefs(scheduleStore)

const menu = ref(false)
const dateSelected = ref()
const fullCalendar = ref()
const monthSelected = ref('')

let dayNames = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

const animalType = ref([
  {
    id: AnimalTypeEnum._ALL,
    name: AnimalTypeEnum.ALL
  },
  {
    id: AnimalTypeEnum._CAT,
    name: AnimalTypeEnum.CAT
  },
  {
    id: AnimalTypeEnum._DOG,
    name: AnimalTypeEnum.DOG
  }
])

const emit = defineEmits(['calendarClick', 'eventClick', 'createSchedule'])

const selectDate = function (date: any) {
  fullCalendar.value.getApi().gotoDate(date)

  updateFilterDate()
  menu.value = false
}

const dateClick = (date) => {
  emit('calendarClick', {
    scheduled_at: format(date.date, 'yyyy-MM-dd')
  })
}

const eventClick = function (data) {
  schedule.value = data.event._def.extendedProps.schedule
  emit('eventClick', data.event._def.extendedProps.schedule)
}

const previous = () => {
  fullCalendar.value.getApi().prev()

  updateFilterDate()
}

const next = () => {
  fullCalendar.value.getApi().next()

  updateFilterDate()
}

const today = () => {
  fullCalendar.value.getApi().today()

  updateFilterDate()
}

const updateFilterDate = () => {
  let date = moment(fullCalendar.value.getApi().getDate())

  if (filter.value.month !== date.format('MM')) {
    filter.value.month = date.format('MM')
    filter.value.year = date.format('YYYY')

    applyFilter()
  }
}

const applyFilter = () => {
  scheduleStore.list()
  updateMonthSelected()
}

const updateMonthSelected = () => {
  monthSelected.value = fullCalendar.value?.getApi().currentData.viewTitle.replace('de', '');
}

onMounted(() => updateMonthSelected())

const calendarOptions = reactive({
  locale: ptLocale,
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    listPlugin
  ],
  nowIndicator: true,
  headerToolbar: false,
  initialView: 'dayGridMonth',
  dayHeaderClassNames: 'py-3 text-subtitle-1 font-weight-medium',
  eventDisplay: 'block',
  displayEventEnd: true,
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  },
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    omitZeroMinute: false
  },
  height : "auto",
  events: calendarSchedules,
  editable: true,
  selectable: false,
  selectMirror: true,
  dayMaxEvents: false,
  weekends: true,
  titleFormat: { year: 'numeric', month: 'short' },
  titleRangeSeparator: ' - ',
  eventClick: eventClick,
  dateClick: dateClick,
  allDayContent: '',
})
</script>

<template>
  <v-row class="mb-4" align="center">
    <v-col cols="auto">
      <v-btn
        size="small"
        density="comfortable"
        @click="previous"
        icon="mdi-chevron-left"
      >
      </v-btn>
      <v-btn
        size="small"
        density="comfortable"
        @click="next"
        icon="mdi-chevron-right"
      >
      </v-btn>
    </v-col>

    <v-col cols="auto">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="bottom"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
            class="text-normal"
            variant="outlined"
          >
            {{ monthSelected }}
            <template #append>
              <v-icon icon="mdi-chevron-down" v-if="!menu"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </template>
          </v-btn>

          <v-btn
            color="primary"
            class="text-normal ml-3"
            variant="outlined"
            @click="today"
          >
            Hoje
          </v-btn>
        </template>
        <v-card>
          <VueDatePicker v-model="dateSelected"
                         auto-apply
                         close-on-auto-apply
                         @update:model-value="selectDate"
                         locale="pt-BR"
                         :day-names="dayNames"
                         :enable-time-picker="false"
                         inline
          >
          </VueDatePicker>
        </v-card>
      </v-menu>
    </v-col>

    <v-col cols="auto" lg="2" md="3" sm="3">
      <v-select :items="makeAutocomplete(animalType)"
                v-model="filter.animalType"
                color="primary"
                hide-details="auto"
                label="Tipo"
                @update:model-value="applyFilter"
      />
    </v-col>

    <v-col class="text-right" align-self="center" v-if="!isDoctor">
      <v-btn color="primary"
             class="text-normal"
             @click="emit('createSchedule')"
      >
        Nova marcação
      </v-btn>
    </v-col>
  </v-row>

  <FullCalendar ref="fullCalendar" :options="calendarOptions">
    <template #eventContent="ev" @click.prevent>
      <div class="d-flex justify-space-between">
        <div v-if="ev.view.type === 'dayGridMonth'">
          <span class="text-capitalize">
            <span v-if="ev.event.extendedProps.schedule.doctor" class="m-0 p-0">{{firstAndLastName(ev.event.extendedProps.schedule.doctor.name)}}</span>
            <span v-else class="font-italic m-0 p-0">Sem médico</span>
          </span> <br />

          <span class="text-capitalize">
            {{firstAndLastName(ev.event._def.title)}} (<span class="font-italic">{{ firstName(ev.event.extendedProps.schedule.animal.name) }}</span>)
          </span> <br />

          {{ SchedulePeriodEnum[ev.event.extendedProps.schedule.period] }}
        </div>
      </div>
    </template>
  </FullCalendar>
</template>

<style scoped lang="scss">
.fc .fc-daygrid-body-natural .fc-daygrid-day-events {
  margin-bottom: 0 !important;
}
</style>
