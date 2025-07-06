import { logout } from '@entities/Auth/AuthSlice';
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import {
   ACCESS_TOKEN_LOCALSTORAGE_KEY,
   DATE_TOKEN,
   REFRESH_TOKEN_LOCALSTORAGE_KEY,
   TOKEN_EXPIRES_IN,
} from '@shared/consts/ls';
import { BASE_URL } from '@shared/consts/urls';
import { FetchBaseQueryError } from '@shared/types';
import { isExpiredToken } from '@shared/utils';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
   baseUrl: BASE_URL,
   credentials: 'include',
   headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
   },
   prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      if (token) {
         headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
   },
});

export const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (
   args,
   api,
   extraOptions,
) => {
   await mutex.waitForUnlock();
   let result = await baseQuery(args, api, extraOptions);

   if (result.error && result.error.status === 401) {
      if (
         isExpiredToken(localStorage.getItem(DATE_TOKEN), localStorage.getItem(TOKEN_EXPIRES_IN))
      ) {
         if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
               const refreshResult: any = await baseQuery('/refreshToken', api, extraOptions);
               if (refreshResult.data) {
                  localStorage.setItem(
                     ACCESS_TOKEN_LOCALSTORAGE_KEY,
                     refreshResult.data?.data.token,
                  );
                  localStorage.setItem(
                     REFRESH_TOKEN_LOCALSTORAGE_KEY,
                     refreshResult?.data?.data.refresh_token,
                  );
                  result = await baseQuery(args, api, extraOptions);
               } else {
                  api.dispatch(logout());
               }
            } finally {
               release();
            }
         } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
         }
      } else {
         api.dispatch(logout());
      }
   }

   return result;
};
