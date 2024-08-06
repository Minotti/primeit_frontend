<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';

import { Menu2Icon } from 'vue-tabler-icons';
import Logo from '../logo/Logo.vue';

import ProfileDD from '../vertical-header/ProfileDD.vue';
import RightMobileSidebar from '../vertical-header/RightMobileSidebar.vue';

const customizer = useCustomizerStore();

const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

watch(priority, (newPriority) => {
    priority.value = newPriority;
});
</script>

<template>
    <v-app-bar elevation="0" :priority="priority" height="64" class="horizontal-header" color="background">
        <div :class="customizer.boxed ? 'maxWidth v-toolbar__content px-lg-0 px-4' : 'v-toolbar__content px-6'">
            <div class="hidden-md-and-down">
                <Logo />
            </div>
            <v-btn class="hidden-md-and-up" icon variant="text" @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
                <Menu2Icon size="25" />
            </v-btn>

            <!-- ---------------------------------------------- -->
            <!-- User Profile -->
            <!-- ---------------------------------------------- -->
            <div class="ml-3">
                <ProfileDD />
            </div>
        </div>
    </v-app-bar>

    <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
        <RightMobileSidebar />
    </v-navigation-drawer>
</template>
