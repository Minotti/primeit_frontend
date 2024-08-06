<script setup lang="ts">
const props = defineProps({
  dialog: {
    default: false
  },
  persistent: {
    default: true
  },
  width: {
    default: 650
  },
  loading: {
    default: false
  },
  confirmButton: {
    default: 'Confirmar'
  },
  title: {
    required: false,
    default: 'Confirma a ação?'
  }
})

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <v-dialog :model-value="dialog"
            :persistent="persistent"
            :width="width"
  >
    <v-card>
      <v-card-title class="mt-2">
        <div class="d-flex justify-space-between">
          <span class="text-h5">{{ title }}</span>

          <v-icon class="cursor-pointer" @click="emit('close')" icon="mdi-close"></v-icon>
        </div>
      </v-card-title>

      <v-card-text class="px-4">
        <slot />
        <h4 v-if="!$slots.default">Tem certeza que deseja prosseguir? Essa ação será irreversível.</h4>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          variant="flat"
          class="w-25"
          :loading="loading"
          @click="emit('confirm')"
        >
          {{ confirmButton }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
