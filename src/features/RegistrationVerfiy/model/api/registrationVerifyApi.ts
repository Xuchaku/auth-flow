import { RtkApi } from '@shared/api/Rtk/RtkApi';
import { RegisterVerifyForm } from '../types';

export const registrationVerifyApi = RtkApi.injectEndpoints({
   endpoints: (builder) => ({
      registerVerify: builder.query<void, RegisterVerifyForm>({
         query: (body) => ({
            url: '/registration/verify',
            body,
            method: 'PATCH',
         }),
      }),
   }),
});
