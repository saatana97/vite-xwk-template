<template>
    <el-config-provider
        :button="config.button"
        :locale="config.locale"
        :message="config.message"
        :size="config.size"
        :z-index="config.zIndex"
    >
        <Suspense>
            <router-view />
        </Suspense>
    </el-config-provider>
</template>

<script setup lang="ts">
    import zh from 'element-plus/lib/locale/lang/zh-cn';
    const config = reactive({
        locale: zh,
        size: void 0,
        zIndex: 300,
        button: {
            autoInsertSpace: true,
        },
        message: {
            max: 5,
        },
    });
</script>

<style lang="less" scoped></style>
