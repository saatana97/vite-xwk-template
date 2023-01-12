import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('auth', () => {
    const token = ref('');
    const profile = ref({});
    const login = async () => {};
    const logout = async () => {};
    return { token, profile, login, logout };
});
