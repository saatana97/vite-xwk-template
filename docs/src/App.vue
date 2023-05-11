<template>
    <h2>
        <span>值：{{ value }}</span>
        <span>激活数量：{{ count() }}</span>
    </h2>
    <ul>
        <li v-for="(item, index) in cards" :key="index" :class="{ active: status(item) }" @click="toggle(item)">
            <span>{{ item }}</span>
            <span>{{ status(item) }}</span>
        </li>
    </ul>
    <p>
        <span>123全激活</span>
        <span>{{ status([1, 2, 3], StatusLogic.AND) }}</span>
    </p>
    <p>
        <span>678全激活</span>
        <span>{{ status([6, 7, 8], StatusLogic.AND) }}</span>
    </p>
    <p>
        <span>789全激活</span>
        <span>{{ status([7, 8, 9], StatusLogic.AND) }}</span>
    </p>
    <hr />
    <p>
        <span>123至少激活一个</span>
        <span>{{ status([1, 2, 3], StatusLogic.OR) }}</span>
    </p>
    <p>
        <span>678至少激活一个</span>
        <span>{{ status([6, 7, 8], StatusLogic.OR) }}</span>
    </p>
    <p>
        <span>789至少激活一个</span>
        <span>{{ status([7, 8, 9], StatusLogic.OR) }}</span>
    </p>
    <hr />
    <p>
        <span>123全未激活</span>
        <span>{{ status([1, 2, 3], StatusLogic.NOT) }}</span>
    </p>
    <p>
        <span>678全未激活</span>
        <span>{{ status([6, 7, 8], StatusLogic.NOT) }}</span>
    </p>
    <p>
        <span>789全未激活</span>
        <span>{{ status([7, 8, 9], StatusLogic.NOT) }}</span>
    </p>
    <hr />
    <p>
        <span>123两种状态都有</span>
        <span>{{ status([1, 2, 3], StatusLogic.XOR) }}</span>
    </p>
    <p>
        <span>678两种状态都有</span>
        <span>{{ status([6, 7, 8], StatusLogic.XOR) }}</span>
    </p>
    <p>
        <span>789两种状态都有</span>
        <span>{{ status([7, 8, 9], StatusLogic.XOR) }}</span>
    </p>
    <p>
        <span>6两种状态都有</span>
        <span>{{ status([6], StatusLogic.XOR) }}</span>
    </p>
    <p>
        <span>7两种状态都有</span>
        <span>{{ status([7], StatusLogic.XOR) }}</span>
    </p>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { createBinaryStatusStore, StatusLogic } from '../../src/index';
    const value = ref(127);
    const cards = Array.from({ length: 10 }, (item, index) => index);
    const { active, inactive, toggle, status, count } = createBinaryStatusStore({
        value: value.value,
        change: (val) => {
            value.value = val;
        },
    });
</script>

<style scoped lang="less">
    ul {
        list-style: none;
        padding: 0;

        li {
            padding: 5px;
            margin: 10px 0;
            background: lightgray;

            &.active {
                background: skyblue;
            }
        }
    }

    p {
        margin: 5px 0;
    }

    span {
        + span {
            margin-left: 20px;
        }
    }
</style>
