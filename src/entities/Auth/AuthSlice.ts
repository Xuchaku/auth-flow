import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
   ACCESS_TOKEN_LOCALSTORAGE_KEY,
   DATE_TOKEN,
   REFRESH_TOKEN_LOCALSTORAGE_KEY,
   TOKEN_EXPIRES_IN,
} from '@shared/consts/ls';
import { AuthSchema, DataLoginAuth } from './model/types';
import { isExpiredToken } from '@shared/utils';

const isToken =
   Boolean(localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY)) &&
   !isExpiredToken(localStorage.getItem(DATE_TOKEN), localStorage.getItem(TOKEN_EXPIRES_IN));

const initialState: AuthSchema = {
   isToken,
};

const authSlice = createSlice({
   name: 'authSlice',
   initialState,
   reducers: {
      setAuthData: (state, action: PayloadAction<DataLoginAuth>) => {
         state.isToken = true;
         localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, action.payload.access_token);
         localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, action.payload.refresh_token);
         localStorage.setItem(TOKEN_EXPIRES_IN, String(action.payload.expires_in));
         localStorage.setItem(DATE_TOKEN, String(Date.now()));
      },
      logout: (state) => {
         state.isToken = false;
         localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
         localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
         localStorage.removeItem(TOKEN_EXPIRES_IN);
      },
   },
});

export const { reducer: authReducer } = authSlice;
export const { setAuthData, logout } = authSlice.actions;
