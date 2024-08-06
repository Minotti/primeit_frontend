<script setup>
import Icon from '../Icon.vue';
import { useCustomizerStore } from '@/stores/customizer';
import { storeToRefs } from 'pinia';

const props = defineProps({ item: Object, level: Number });
const customizer = useCustomizerStore();
const { menu_item_active } = storeToRefs(customizer);

const executables = {};
</script>

<template>
    <!---Single Item-->
    <v-list-item
        v-if="item.executable"
        v-show="item.showMenu ? executables[item.showMenu]() : true"
        @click="executables[item.executable]()"
        rounded
        class="mb-1"
        :active-class="menu_item_active"
        :disabled="item.disabled"
        :target="item.type === 'external' ? '_blank' : ''"
    >
        <!---If icon-->
        <template v-slot:prepend>
            <Icon :item="item.icon" :level="level" />
        </template>

        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
            {{ item.subCaption }}
        </v-list-item-subtitle>
        <!---If any chip or label-->
        <template v-slot:append v-if="item.chip">
            <v-chip
                :color="item.chipColor"
                :class="'sidebarchip ml-1 hide-menu bg-' + item.chipBgColor"
                :size="item.chipIcon ? 'small' : 'small'"
                :label="item.chipLabel"
                :variant="item.chipVariant"
                :prepend-icon="item.chipIcon"
            >
                {{ item.chip }}
            </v-chip>
        </template>
    </v-list-item>

    <v-list-item
        v-else
        :to="item.type === 'external' ? '' : { name: item.to }"
        :href="item.type === 'external' ? item.to : ''"
        rounded
        class="mb-1"
        :active-class="menu_item_active"
        :disabled="item.disabled"
        :target="item.type === 'external' ? '_blank' : ''"
    >
        <!---If icon-->
        <template v-slot:prepend>
            <Icon :item="item.icon" :level="level" />
        </template>

        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
            {{ item.subCaption }}
        </v-list-item-subtitle>
        <!---If any chip or label-->
        <template v-slot:append v-if="item.chip">
            <v-chip
                :color="item.chipColor"
                :class="'sidebarchip ml-1 hide-menu bg-' + item.chipBgColor"
                :size="item.chipIcon ? 'small' : 'small'"
                :label="item.chipLabel"
                :variant="item.chipVariant"
                :prepend-icon="item.chipIcon"
            >
                {{ item.chip }}
            </v-chip>
        </template>
    </v-list-item>
</template>

<style lang="scss" scoped>
:deep(.v-list-item__prepend) {
    margin-inline-end: 8px !important;
}
</style>
