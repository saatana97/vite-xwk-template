<template>
    <h1>{{ lib }}</h1>
</template>

<script setup lang="ts">
    import { useLib } from '@pkgs/lib';
    const lib = useLib();
</script>

<style lang="less" scoped></style>
