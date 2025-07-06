import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { RtkApi } from '@shared/api/Rtk/RtkApi';
import { StateSchema } from './model/types';
import { authReducer } from '@entities/Auth/AuthSlice';
import { userReducer } from '@entities/User/UserSlice';

const rootReducers: ReducersMapObject<StateSchema> = {
   auth: authReducer,
   user: userReducer,
   [RtkApi.reducerPath]: RtkApi.reducer,
};

export const store = configureStore({
   reducer: rootReducers,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(RtkApi.middleware),
});
