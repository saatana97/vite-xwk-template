<template>
    <img height="64" :src="logo" width="64" />
    <component :is="svgs.logo" height="64" width="64" />
    <svg-icon height="64" name="logo" width="64" />
</template>
<script setup lang="ts">
    import logo from '@/icons/svg/logo.svg?url';
    import { svgs } from '@/icons';
</script>
<style scoped lang="less"></style>
