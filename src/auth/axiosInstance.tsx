import axios, { AxiosError } from 'axios';
import { createClient } from '@supabase/supabase-js';
import { envConfig } from '@/utility/environment';
import { accessToken } from './auth';
const supabase = createClient(envConfig.supabaseUrl, envConfig.supabaseApi);

const userAccessToken = async () => {

    const token = await accessToken();
    return token;

};

// instance for authentication
const axiosInstance = axios.create({
    baseURL: envConfig.backendUrl,
});

axiosInstance.interceptors.request.use(
    async config => {

        //headers for every request
        const accessToken = await userAccessToken();


        // if (accessToken) {
        //     config.headers.Authorization = `Bearer ${accessToken}`;
        // }

        if (config.data && !(config.data instanceof FormData)) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers['Content-Type'] = "application/json";
        } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers['Content-Type'] = "application/x-www-form-urlencoded";
        }


        return config;

    },

    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,


    async (error: AxiosError) => {


        if (error.isAxiosError) {

            try {
                const { data: refreshedSession, error: refreshError }: any = await supabase.auth.refreshSession();

                if (refreshError || !refreshedSession) {
                    return Promise.reject(error);
                }

                const newAccessToken = refreshedSession?.session?.access_token;

                const url: any = error.config?.url;
                const method: any = error.config?.method;
                const data: any = error.config?.data;

                const headers: any = {
                    'Content-Type': error.config?.headers['Content-Type'],
                    'Authorization': `Bearer ${newAccessToken}`
                };

                return axios.request({
                    method, url, headers, data
                });

            } catch (refreshError) {
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
    }

);

export default axiosInstance;
