<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Darklogo from '@/assets/images/logos/logo_white.png';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="Darklogo" alt="home" />
        </RouterLink>
    </div>
</template>
