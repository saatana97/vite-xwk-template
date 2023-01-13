<template>
    <el-card header="显示自定义SVG图标">
        <el-space alignment="center" :size="10">
            <el-card header="1、使用img标签显示svg图标">
                <img height="64" :src="logo" width="64" />
            </el-card>
            <el-card header="2、使用vite-svg-loader插件显示svg图标">
                <component :is="svgs.logo" height="64" width="64" />
            </el-card>
            <el-card header="3、将2封装为组件再使用">
                <svg-icon height="64" name="logo" width="64" />
            </el-card>
        </el-space>
        <el-button type="primary">点我也没用</el-button>
    </el-card>
</template>
<script setup lang="ts">
    import logo from '@/icons/svg/logo.svg?url';
    import { svgs } from '@/icons';
</script>
<style scoped lang="less"></style>
