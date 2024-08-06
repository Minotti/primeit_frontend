<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useErrorsStore } from '@/stores/errorsStore';

const authStore = useAuthStore();
const password = ref();
const email = ref();
const showPassword = ref(false);
const wrongPassword = ref(false);

const { loading } = storeToRefs(authStore);

const errorsStore = useErrorsStore();
const { errors } = storeToRefs(errorsStore);

const login = function () {
  wrongPassword.value = false

  authStore.login(email.value, password.value)
    .catch(() => {
      wrongPassword.value = true
    });
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Email *</v-label>
      <v-text-field
        v-model="email"
        variant="outlined"
        hide-details="auto"
        :error-messages="errors.email"
        @update:model-value="errorsStore.clearError('email')"
        placeholder="E-mail"
      />
    </v-col>

    <v-col cols="12">
      <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Senha *</v-label>
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
        variant="outlined"
        hide-details="auto"
        :error-messages="errors.password"
        @update:model-value="errorsStore.clearError('password')"
        placeholder="Senha"
      />
    </v-col>
  </v-row>

  <v-alert color="error" class="mt-6" v-if="wrongPassword">
    Email ou senha incorretos
  </v-alert>

  <v-btn block color="primary" class="mt-6" :loading="loading" @click="login">Entrar </v-btn>
</template>
