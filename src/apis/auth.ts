import { request } from '@/utils/request';
export interface PSignin {
    username: string;
    password: string;
}
export interface RSignin {
    token: string;
}
export const signin = (data: PSignin) =>
    request<RSignin>({
        method: 'post',
        url: '/signin',
        data,
    });
