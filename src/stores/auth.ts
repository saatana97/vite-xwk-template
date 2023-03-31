export const useAuthStore = defineStore('auth', () => {
    const token = ref('');
    const profile = ref({});
    const login = async () => {};
    const logout = async () => {};
    return { token, profile, login, logout };
});
