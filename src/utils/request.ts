import useAuthStore from '@/stores/auth';
import type { AxiosResponse, HttpStatusCode } from 'axios';
import axios from 'axios';
import qs from 'qs';

interface Res {
    code: HttpStatusCode;
    msg: string;
    data?: Record<string, unknown> | null;
}

const handleResponse = async ({
    config: requestConfig,
    data,
    status,
}: AxiosResponse<Res | undefined>): Promise<Record<string, unknown> | Res | null | undefined> => {
    const code = data?.code || status;
    console.info('[api]', code, requestConfig.method, requestConfig.url, data?.data);
    if (code !== 200) {
        if (data) {
            data.data = null;
        }
        switch (code) {
            case 401:
            case 403:
                useAuthStore().logout();
                break;
            default:
                console.error(data?.msg || '服务器异常');
                break;
        }
    }
    return data;
};

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = useAuthStore().token;
        if (config.headers && token) {
            (config.headers as Record<string, unknown>)['Authorization'] = token;
        }
        config.params = Object.fromEntries(
            Object.entries(config.params || {}).filter(
                (entry) =>
                    entry[1] !== null &&
                    typeof entry[1] !== 'undefined' &&
                    (typeof entry[1] !== 'string' || entry[1].trim() !== '')
            )
        );
        if (
            config.data &&
            config.headers &&
            (config.headers as Record<string, unknown>)['Content-Type'] ===
                'application/x-www-form-urlencoded;charset=UTF-8'
        ) {
            config.data = qs.stringify(config.data, { allowDots: true, arrayFormat: 'indices' });
        }
        if (config.headers && config.data instanceof FormData) {
            (config.headers as Record<string, unknown>)['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        handleResponse(response as AxiosResponse<Res, unknown>);
        return response;
    },
    (error) => {
        let res = null;
        if (!error.response) {
            console.error(error.message || '请求失败');
        } else {
            res = handleResponse(error.response);
        }
        return res;
    }
);

export default instance;
