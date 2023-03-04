import useAuthStore from '@/stores/auth';
import type { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';
interface CommonResponse<T> {
    code: HttpStatusCode;
    msg: string;
    data?: T;
}
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
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => {
        const code = response.data?.code || response.status;
        console.info('[api]', code, response.config.method, response.config.url, response.data?.data);
        if (code !== 200) {
            switch (code) {
                case 401:
                case 403:
                    useAuthStore().logout();
                    break;
                default:
                    console.error(response.data?.msg || '服务器异常');
                    break;
            }
        }
        return response;
    },
    (error) => Promise.reject(error)
);
export const request = async <Res, Req = unknown>(config: AxiosRequestConfig<Req>) => {
    const res = await instance.request<CommonResponse<Res>, AxiosResponse<Res>, Req>(config);
    return res.data;
};
export const get = <Res, Req = never>(url: string, params?: unknown, config?: AxiosRequestConfig<Req>) =>
    request<Res, Req>({
        method: 'get',
        url,
        params,
        ...config,
    });
export const post = <Res, Req = unknown>(url: string, data?: Req, config?: AxiosRequestConfig<Req>) =>
    request<Res, Req>({
        method: 'post',
        url,
        data,
        ...config,
    });
export const put = <Res, Req = unknown>(url: string, data?: Req, config?: AxiosRequestConfig<Req>) =>
    request<Res, Req>({
        method: 'put',
        url,
        data,
        ...config,
    });
export const del = <Res, Req = unknown>(url: string, params?: unknown, config?: AxiosRequestConfig<Req>) =>
    request<Res, Req>({
        method: 'delete',
        url,
        params,
        ...config,
    });
