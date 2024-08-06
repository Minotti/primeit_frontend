<script setup lang="ts">
import DefaultDialog from '@/components/shared/DefaultDialog.vue';
import { useCustomerStore } from '@/stores/customer/CustomerStore';
import { storeToRefs } from 'pinia';
import { useErrorsStore } from '@/stores/errorsStore';
import { toast } from 'vue3-toastify';
import { CUSTOMER_ANIMAL_CREATED } from '@/utils/messages/customerMessages';
import { ref } from 'vue';
import { AnimalTypeEnum } from '@/enums/AnimalTypeEnum';
import { makeAutocomplete } from '@/utils/makeAutocomplete';

const props = defineProps({
  dialog: {
    required: true,
    type: Boolean
  }
})

const emit = defineEmits(['close', 'save'])

const customerStore = useCustomerStore()
const { loading, customer, animal } = storeToRefs(customerStore)

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)

const animalType = ref([
  {
    id: AnimalTypeEnum._CAT,
    name: AnimalTypeEnum.CAT
  },
  {
    id: AnimalTypeEnum._DOG,
    name: AnimalTypeEnum.DOG
  }
])
const save = () => {
  customerStore.storeAnimal().then(() => {
    toast.success(CUSTOMER_ANIMAL_CREATED)
    emit('save')
  })
}
</script>

<template>
  <default-dialog title="Novo animal"
                  v-model="dialog"
                  width="450"
                  @close="emit('close')"
                  :loading="loading"
                  persistent>
    <template #default>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Nome"
            color="primary"
            hide-details="auto"
            v-model="animal.name"
            :error-messages="errors['name']"
            @update:model-value="errorsStore.clearError('name')"
          />
        </v-col>

        <v-col cols="12" lg="6" md="6" sm="6">
          <v-select
            label="Raça"
            color="primary"
            hide-details="auto"
            :items="makeAutocomplete(animalType)"
            v-model="animal.type"
            :error-messages="errors['type']"
            @update:model-value="errorsStore.clearError('type')"
          />
        </v-col>

        <v-col cols="12" lg="6" md="6" sm="6">
          <v-text-field
            label="Idade"
            type="number"
            min="0"
            color="primary"
            hide-details="auto"
            v-model="animal.age"
            :error-messages="errors['age']"
            @update:model-value="errorsStore.clearError('age')"
          />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-btn variant="outlined"
             @click="emit('close')"
             :loading="loading"
      >
        Fechar
      </v-btn>

      <v-spacer />

      <v-btn color="primary"
             variant="flat"
             :loading="loading"
             @click="save">
        Salvar
      </v-btn>
    </template>
  </default-dialog>
</template>

<style scoped lang="scss">

</style>
