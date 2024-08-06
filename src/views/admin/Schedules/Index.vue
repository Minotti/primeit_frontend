<script setup lang="ts">
import Calendar from '@/views/admin/Schedules/components/Calendar.vue';
import { useScheduleStore } from '@/stores/schedules/ScheduleStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import DialogSchedule from '@/views/admin/Schedules/components/DialogSchedule.vue';
import { useCustomerStore } from '@/stores/customer/CustomerStore';
import { emptySchedule } from '@/interfaces/schedule/ScheduleInterface';
import { isDoctor } from '@/utils/userRole';

const scheduleStore = useScheduleStore()
const { loading, schedule } = storeToRefs(scheduleStore)

const openDialogSchedule = ref(false)

const customerStore = useCustomerStore()

const openCloseDialogSchedule = function () {
  openDialogSchedule.value = !openDialogSchedule.value
}

const create = function (additional: Object) {
  if (isDoctor) {
    return
  }

  schedule.value = {
    ...emptySchedule,
    ...additional
  }

  openCloseDialogSchedule()
}

const eventClick = () => {

}

onMounted(() => {
  scheduleStore.list()
  customerStore.list()
})
</script>

<template>
  <v-card elevation="10" :loading="loading" :disabled="loading">
    <v-card-text>
      <Calendar
        @calendar-click="create"
        @create-schedule="create"
        @event-click="openCloseDialogSchedule"
      />
    </v-card-text>
  </v-card>

  <dialog-schedule :dialog="openDialogSchedule"
                   @close="openCloseDialogSchedule"
  />
</template>

<style scoped lang="scss">

</style>
