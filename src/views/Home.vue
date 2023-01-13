<template>
    <!-- 使用img标签显示svg图标 -->
    <img height="64" :src="logo" width="64" />
    <!-- 使用vite-svg-loader插件显示svg图标 -->
    <component :is="svgs.logo" height="64" width="64" />
</template>
<script setup lang="ts">
    import logo from '@/icons/svg/logo.svg?url';
    import { svgs } from '@/icons';
</script>
<style scoped lang="less"></style>
