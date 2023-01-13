<template>
    <p>1、使用img标签显示svg图标</p>
    <img height="64" :src="logo" width="64" />
    <p>2、使用vite-svg-loader插件显示svg图标</p>
    <component :is="svgs.logo" height="64" width="64" />
    <p>3、将2封装为组件再使用</p>
    <svg-icon height="64" name="logo" width="64" />
</template>
<script setup lang="ts">
    import logo from '@/icons/svg/logo.svg?url';
    import { svgs } from '@/icons';
</script>
<style scoped lang="less"></style>
