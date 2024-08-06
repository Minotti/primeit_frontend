<script setup lang="ts">
import { RouterView } from 'vue-router';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import { useCustomizerStore } from '@/stores/customizer';

const customizer = useCustomizerStore();
</script>

<template>
    <!-----RTL LAYOUT------->
    <v-locale-provider>
        <v-app
            :theme="customizer.actTheme"
            :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : '',
                customizer.inputBg ? 'inputWithbg' : ''
            ]"
        >
            <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
            <VerticalHeaderVue v-if="!customizer.setHorizontalLayout" />

            <v-main>
                <v-container :fluid="true" class="page-wrapper pb-sm-15 pb-10 pt-0">
                    <div>
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
