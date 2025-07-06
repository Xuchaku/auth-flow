import { RtkApi } from '@shared/api/Rtk/RtkApi';
import { BasicInfoRes, DataLoginAuthRes, UserShema } from '../types';

export const userApi = RtkApi.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.query<DataLoginAuthRes, Pick<UserShema, 'email' | 'password'>>({
         query: (body) => ({
            url: '/login',
            body,
            method: 'POST',
         }),
      }),
      basicInfo: builder.query<BasicInfoRes, null>({
         query: () => ({
            url: '/basicInfo',
         }),
      }),
   }),
});
