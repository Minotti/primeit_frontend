<script setup lang="ts">
import { MailIcon } from 'vue-tabler-icons';

import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="@/assets/images/profile/user_default.jpeg" width="35" alt="Julia" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10" v-if="user">
            <div class="px-8 pt-6">
                <h6 class="text-h5 font-weight-medium text-normal">Dados do usuário</h6>
                <div class="d-flex align-center mt-4 pb-6">
                    <v-avatar size="80">
                        <img src="@/assets/images/profile/user_default.jpeg" width="80" />
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-h6 mb-n1">{{ user.name }}</h6>
                        <div class="d-flex align-center mt-1">
                            <MailIcon size="18" stroke-width="1.5" />
                            <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">{{ user.email }}</span>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>
            <div class="pt-4 pb-6 px-8 text-center">
                <v-btn color="primary" variant="outlined" class="text-normal" block @click="authStore.logout()">Sair do Sistema</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
