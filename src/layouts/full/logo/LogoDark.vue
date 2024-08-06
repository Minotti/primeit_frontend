<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logo from '@/assets/images/logos/logo_dark.png';
import icon from '@/assets/images/logos/logo_mini.png';

import { useCustomizerStore } from '@/stores/customizer';
import { storeToRefs } from 'pinia';

const customizer = useCustomizerStore();
const { mini_sidebar } = storeToRefs(customizer);
</script>
<template>
    <div class="logo text-center">
        <RouterLink to="/">
            <v-fade-transition hide-on-leave leave-absolute>
                <img v-if="!mini_sidebar" :src="logo" alt="home" style="max-width: 150px" />
            </v-fade-transition>

            <v-fade-transition hide-on-leave leave-absolute>
                <img v-if="mini_sidebar" :src="icon" style="max-width: 35px" />
            </v-fade-transition>
        </RouterLink>
    </div>
</template>
