<script setup lang="ts">
const props = defineProps({
  title: {
    required: false
  },
  titleColor: {
    required: false
  },
  loading: {
    required: false,
    default: false
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <v-dialog v-bind="$props" title="">
    <v-card :loading="loading" :disabled="loading">
      <v-card-title class="mt-2" v-if="title">
        <div class="d-flex justify-space-between">
          <span class="text-h5" :class="titleColor" v-text="title" />
          <v-icon class="cursor-pointer" @click="emit('close')" icon="mdi-close"></v-icon>
        </div>
      </v-card-title>

      <v-card-text class="pa-4">
        <slot />
      </v-card-text>

      <v-card-actions class="pa-4" v-if="$slots['actions']">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
