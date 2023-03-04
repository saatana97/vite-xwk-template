<template>
    <component :is="svgs[props.name]" v-if="props.name && svgs[props.name]" class="x-icon" />
    <span v-else>{{ props.name || 'icon' }}</span>
</template>
<script lang="ts">
    export default defineComponent({
        name: 'SvgIcon',
    });
</script>
<script setup lang="ts">
    import { svgs } from '@/icons';
    import { defineComponent } from 'vue';
    const props = defineProps<{
        name: string;
    }>();
</script>

<style scoped lang="less"></style>
