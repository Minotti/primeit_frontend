<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { Menu2Icon } from 'vue-tabler-icons';
import RightMobileSidebar from './RightMobileSidebar.vue';
import ProfileDD from './ProfileDD.vue';
import {router} from "@/router";

const customizer = useCustomizerStore();
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

watch(priority, (newPriority) => {
  priority.value = newPriority;
});

const headerTitle = ref(router.currentRoute.value.meta.headerTitle)
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="64" color="background" id="top">
    <v-btn
      class="hidden-md-and-down"
      icon
      color="primary"
      variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <Menu2Icon size="25" />
    </v-btn>

    <v-btn class="hidden-lg-and-up" icon variant="text" @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
      <Menu2Icon size="25" />
    </v-btn>

    <span class="text-h3 font-weight-bold text-truncate" v-text="headerTitle" />

    <v-spacer />

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <div class="ml-2">
      <ProfileDD />
    </div>
  </v-app-bar>

  <!-- ---------------------------------------------- -->
  <!-- Right Sidebar -->
  <!-- ---------------------------------------------- -->
  <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
    <RightMobileSidebar />
  </v-navigation-drawer>
</template>
