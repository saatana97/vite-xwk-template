<template>
    <el-config-provider v-bind="config">
        <Suspense>
            <router-view />
        </Suspense>
    </el-config-provider>
</template>

<script setup lang="ts">
    import zh from 'element-plus/lib/locale/lang/zh-cn';
    const config = {
        locale: zh,
        size: '',
        zIndex: 300,
        button: {
            autoInsertSpace: true,
        },
        message: {
            max: 5,
        },
    } as const;
</script>

<style lang="less" scoped></style>
