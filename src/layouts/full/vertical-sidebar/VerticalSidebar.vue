<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';

import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/Logo.vue';
import { useAuthStore } from '@/stores/auth';

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
const authStore = useAuthStore();
</script>

<template>
    <v-navigation-drawer
        left
        v-model="customizer.Sidebar_drawer"
        elevation="0"
        rail-width="70"
        mobile-breakpoint="960"
        app
        class="leftSidebar"
        :rail="customizer.mini_sidebar"
        expand-on-hover
        width="256"
    >
        <template v-slot:prepend>
            <div class="pa-5 pl-2" :class="{ 'pl-4': customizer.mini_sidebar }">
                <Logo />
            </div>
        </template>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <!--    <perfect-scrollbar class="scrollnavbar">-->
        <!--      <v-list class="py-6 px-4">-->
        <!--        &lt;!&ndash;-Menu Loop &ndash;&gt;-->
        <!--        <template v-for="(item, i) in sidebarMenu">-->
        <!--          &lt;!&ndash;-Item Sub Header &ndash;&gt;-->
        <!--          <NavGroup :item="item" v-if="item.header" :key="item.title"/>-->
        <!--          &lt;!&ndash;-If Has Child &ndash;&gt;-->
        <!--          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children"/>-->
        <!--          &lt;!&ndash;-Single Item&ndash;&gt;-->
        <!--          <NavItem :item="item" v-else class="leftPadding"/>-->
        <!--          &lt;!&ndash;-End Single Item&ndash;&gt;-->
        <!--        </template>-->
        <!--      </v-list>-->
        <!--    </perfect-scrollbar>-->

        <perfect-scrollbar class="scrollnavbar">
            <v-list class="py-2 px-3">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
        </perfect-scrollbar>

        <template #append>
            <div class="pa-2">
                <v-btn flat block @click="authStore.logout()" v-if="!customizer.mini_sidebar" color="primary" class="text-normal">
                    Sair do Sistema
                </v-btn>

                <v-list v-else class="smallCap">
                    <v-btn block @click="authStore.logout()" color="primary" variant="flat" class="mini-icon">
                        <v-icon icon="mdi-exit-to-app"></v-icon>
                    </v-btn>
                    <v-btn block @click="authStore.logout()" color="primary" variant="flat" class="mini-text text-normal"
                        >Sair do Sistema
                    </v-btn>
                </v-list>
            </div>
        </template>
    </v-navigation-drawer>
</template>
