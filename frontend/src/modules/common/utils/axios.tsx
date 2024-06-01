import React, { useEffect } from 'react';
import { useContext } from 'react'; // Import the appropriate context hook

import AuthContext from '../auth/context/AuthProvider';
import API from '../auth/constants';

import { ENVIRONMENT } from 'config';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: ENVIRONMENT.BACKEND_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const getNewAccessToken = async () => {
  const response = await axiosInstance.get(API.POST_REFRESH_TOKENS.path);
  const { accessToken } = response.data;
  return accessToken;
};

const AxiosInterceptor = () => {
  const { auth } = useContext(AuthContext);
  const { accessToken } = auth;

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        // Add the access token to the request headers
        if (
          accessToken &&
          config.headers &&
          'Authorization' in config.headers
        ) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        //try refresh endpoint
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
          _queue?: boolean;
        };
        if (
          (error?.response?.status === 403 ||
            error?.response?.status === 401) &&
          originalRequest.headers &&
          originalRequest.headers.Authorization &&
          !originalRequest._retry
        ) {
          try {
            originalRequest._retry = true;

            const newAccessToken = await getNewAccessToken();

            originalRequest._queue = true;

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
          } catch (error: any) {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]); // Re-run the effect whenever the accessToken changes

  return null;
};

export default AxiosInterceptor;
