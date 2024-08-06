<script setup lang="ts">
import { useScheduleStore } from '@/stores/schedules/ScheduleStore';
import { storeToRefs } from 'pinia';
import { useErrorsStore } from '@/stores/errorsStore';
import { makeAutocomplete } from '@/utils/makeAutocomplete';
import { useCustomerStore } from '@/stores/customer/CustomerStore';
import { computed, onMounted, ref } from 'vue';
import { emptyCustomerAnimal } from '@/interfaces/customer/CustomerAnimalInterface';
import { SchedulePeriodEnum } from '@/enums/SchedulePeriodEnum';
import DialogCustomer from '@/views/admin/Customers/components/DialogCustomer.vue';
import { emptyCustomer } from '@/interfaces/customer/CustomerInterface';
import DialogCustomerAnimal from '@/views/admin/Customers/components/DialogCustomerAnimal.vue';
import { toast } from 'vue3-toastify';
import { SCHEDULE_CREATED, SCHEDULE_DELETED, SCHEDULE_UPDATED } from '@/utils/messages/scheduleMessages';
import { useDoctorStore } from '@/stores/doctor/DoctorStore';
import { isAttendant, isDoctor, isReceptionist } from '@/utils/userRole';
import SimpleConfirm from '@/components/shared/SimpleConfirm.vue';
import { GENERAL_ERROR } from '@/utils/messages/generalMessages';

const props = defineProps({
  dialog: {
    required: true,
    type: Boolean
  }
})
const emit = defineEmits(['close'])

const scheduleStore = useScheduleStore()
const { loading, schedule } = storeToRefs(scheduleStore)

const customerStore = useCustomerStore()
const { customers, customer, animal } = storeToRefs(customerStore)

const doctorStore = useDoctorStore()
const { doctors } = storeToRefs(doctorStore)

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)

const openDialogCreatePatient = ref(false)
const openDialogCreateAnimal = ref(false)
const openDialogConfirmRemove = ref(false)

const periods = ref([
  {
    id: SchedulePeriodEnum._MORNING,
    name: SchedulePeriodEnum.MORNING
  },
  {
    id: SchedulePeriodEnum._AFTERNOON,
    name: SchedulePeriodEnum.AFTERNOON
  }
])

const animals = computed(() => customers.value.find(c => c.id === schedule.value.customer_id).animals ?? [])

const changeCustomer = () => {
  errorsStore.clearError('customer_id')
  schedule.value.animal_id = undefined
}

const createCustomer = () => {
  customer.value = {...emptyCustomer}
  openDialogCreatePatient.value = true
}

const createCustomerAnimal = () => {
  animal.value = {
    ...emptyCustomerAnimal,
    customer_id: schedule.value.customer_id
  }

  openDialogCreateAnimal.value = true
}

const customerCreated = () => {
  schedule.value.customer_id = customer.value.id

  openDialogCreatePatient.value = false
}

const animalCreated = () => {
  schedule.value.animal_id = animal.value.id
  openDialogCreateAnimal.value = false
}

const save = () => {
  if (isEditing.value) {
    scheduleStore.update().then(() => {
      toast.success(SCHEDULE_UPDATED)
      emit('close')
    })
  } else {
    scheduleStore.store().then(() => {
      toast.success(SCHEDULE_CREATED)
      emit('close')
    })
  }
}

const remove = () => {
  if (isReceptionist) {
    openDialogConfirmRemove.value = true
  }
}

const confirmRemove = () => {
  scheduleStore.delete().then(() => {
    toast.success(SCHEDULE_DELETED)
    openDialogConfirmRemove.value = false
    emit('close')
  }).catch(() => {
    toast.error(GENERAL_ERROR)
  })
}

const isEditing = computed(() => !!schedule.value.id)
const showSaveButton = computed(() => {
  if (isEditing.value) {
    return isReceptionist || isDoctor
  } else {
    return !isDoctor
  }
})

onMounted(() => {
  doctorStore.list()
})
</script>

<template>
  <v-dialog v-model="dialog"
            width="650"
            persistent
            @close="emit('close')"
  >
    <v-card>
      <v-card-title class="mt-2">
        <div class="d-flex justify-space-between">
          <span class="text-h5" v-if="isEditing && isAttendant">Marcação</span>
          <span class="text-h5" v-else-if="isEditing">Editar marcação</span>
          <span class="text-h5" v-else>Nova marcação</span>

          <v-icon class="cursor-pointer" @click="emit('close')" icon="mdi-close"></v-icon>
        </div>
      </v-card-title>

      <v-card-text>
        <v-row v-if="isEditing && !schedule.doctor && !isAttendant">
          <v-col cols="12">
            <v-autocomplete
              variant="outlined"
              label="Médico"
              v-model="schedule.doctor_id"
              hide-details="auto"
              :error-messages="errors['doctor_id']"
              @update:model-value="errorsStore.clearError('doctor_id')"
              :items=makeAutocomplete(doctors)
            />
          </v-col>
        </v-row>

        <v-row v-if="schedule.doctor && !isDoctor">
          <v-col cols="12">
            <v-alert color="lightinfo" density="compact">
              Médico responsável: {{schedule.doctor.name}}
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="12" md="12" sm="12">
            <p class="text-right mb-1">
              <v-btn
                flat
                density="compact"
                class="text-normal"
                color="primary"
                size="small"
                @click="createCustomer"
              >
                Novo cliente
              </v-btn>
            </p>

            <v-autocomplete
              variant="outlined"
              label="Cliente"
              v-model="schedule.customer_id"
              hide-details="auto"
              :error-messages="errors['customer_id']"
              @update:model-value="changeCustomer"
              :items=makeAutocomplete(customers)
            />
          </v-col>

          <v-fade-transition>
            <v-col cols="12" lg="12" md="12" sm="12" v-if="schedule.customer_id">
              <p class="text-right mb-1">
                <v-btn
                  flat
                  density="compact"
                  class="text-normal"
                  color="primary"
                  size="small"
                  @click="createCustomerAnimal"
                >
                  Novo animal
                </v-btn>
              </p>

              <v-autocomplete
                variant="outlined"
                label="Animal"
                v-model="schedule.animal_id"
                hide-details="auto"
                :error-messages="errors['animal_id']"
                @update:model-value="errorsStore.clearError('animal_id')"
                :items=makeAutocomplete(animals)
              />
            </v-col>
          </v-fade-transition>
        </v-row>

        <v-row>
          <v-col cols="12" lg="6" md="6" sm="6">
            <v-text-field
              type="date"
              class="d-block"
              color="primary"
              hide-details="auto"
              v-model="schedule.scheduled_at"
              :error-messages="errors['scheduled_at']"
              @update:model-value="errorsStore.clearError('scheduled_at')"
              label="Data"
            />
          </v-col>

          <v-col cols="12" lg="6" md="6" sm="6">
            <v-select
              color="primary"
              hide-details="auto"
              v-model="schedule.period"
              :error-messages="errors['period']"
              label="Período"
              :items="makeAutocomplete(periods)"
              @update:model-value="errorsStore.clearError('period')"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-textarea
              color="primary"
              counter="255"
              hide-details="auto"
              rows="2"
              auto-grow
              v-model="schedule.symptoms"
              :error-messages="errors['symptoms']"
              @update:model-value="errorsStore.clearError('symptoms')"
              label="Sintomas"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <template v-slot:actions>
        <v-btn variant="outlined"
               @click="emit('close')"
               :loading="loading"
        >
          Fechar
        </v-btn>

        <v-btn variant="outlined"
               color="error"
               v-if="isReceptionist && isEditing"
               @click="remove"
               :loading="loading"
        >
          Excluir
        </v-btn>

        <v-spacer />

        <v-btn
          class="ms-auto"
          color="primary"
          variant="flat"
          text="Salvar"
          :loading="loading"
          v-if="showSaveButton"
          @click="save"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>

  <dialog-customer :dialog="openDialogCreatePatient"
                   @close="openDialogCreatePatient = false"
                   @save="customerCreated"
  />

  <dialog-customer-animal :dialog="openDialogCreateAnimal"
                          @close="openDialogCreateAnimal = false"
                          @save="animalCreated"
  />

  <simple-confirm :dialog="openDialogConfirmRemove"
                  @close="openDialogConfirmRemove = false"
                  width="450"
                  @confirm="confirmRemove"
  />
</template>

<style scoped lang="scss">

</style>
