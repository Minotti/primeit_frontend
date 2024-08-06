<script setup lang="ts">
import DefaultDialog from '@/components/shared/DefaultDialog.vue';
import { useCustomerStore } from '@/stores/customer/CustomerStore';
import { storeToRefs } from 'pinia';
import { useErrorsStore } from '@/stores/errorsStore';
import { toast } from 'vue3-toastify';
import { CUSTOMER_CREATED } from '@/utils/messages/customerMessages';

const props = defineProps({
  dialog: {
    required: true,
    type: Boolean
  }
})

const emit = defineEmits(['close', 'save'])

const customerStore = useCustomerStore()
const { loading, customer } = storeToRefs(customerStore)

const errorsStore = useErrorsStore()
const { errors } = storeToRefs(errorsStore)

const save = () => {
  customerStore.store().then(() => {
    toast.success(CUSTOMER_CREATED)
    emit('save')
  })
}
</script>

<template>
  <default-dialog title="Novo cliente"
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
            v-model="customer.name"
            :error-messages="errors['name']"
            @update:model-value="errorsStore.clearError('name')"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            label="Email"
            color="primary"
            hide-details="auto"
            v-model="customer.email"
            :error-messages="errors['email']"
            @update:model-value="errorsStore.clearError('email')"
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
