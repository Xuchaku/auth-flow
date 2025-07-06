import { configureStore } from '@reduxjs/toolkit';
import { RtkApi } from '@shared/api/Rtk/RtkApi';
import { store } from '../../store';
import { AuthSchema } from '@entities/Auth/model/types';
import { UserShema } from '@entities/User/model/types';

export type StateSchema = {
   auth: AuthSchema;
   user: UserShema;
   [RtkApi.reducerPath]: ReturnType<typeof RtkApi.reducer>;
};

export type AppDispatch = ReturnType<typeof configureStore>['dispatch'];
export type RootState = ReturnType<typeof store.getState>;
