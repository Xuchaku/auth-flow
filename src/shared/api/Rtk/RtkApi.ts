import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../baseQuery/baseQuery';

export const RtkApi = createApi({
   reducerPath: 'api',
   baseQuery: baseQueryWithReauth,
   tagTypes: [],
   endpoints: () => ({}),
});
