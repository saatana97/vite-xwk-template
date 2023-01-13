<template>
    <component :is="svgs[props.name]" class="x-icon" />
</template>

<script setup lang="ts">
    import { svgs } from '@/icons';
    const props = defineProps<{
        name: string;
    }>();
</script>

<style scoped lang="less"></style>
