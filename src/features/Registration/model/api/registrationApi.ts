import { RtkApi } from '@shared/api/Rtk/RtkApi';
import { RegisterForm } from '../types';

export const registrationApi = RtkApi.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.query<void, RegisterForm>({
         query: (body) => ({
            url: '/registration',
            body,
            method: 'POST',
            credentials: 'include',
         }),
      }),
   }),
});
