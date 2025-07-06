import { FetchBaseQueryError as FetchBaseQueryErrorRTK } from '@reduxjs/toolkit/dist/query/react';

export type BaseQueryError = { [key: string]: string[] };

export type FetchBaseQueryError =
   | FetchBaseQueryErrorRTK
   | {
        status: number;
        data?: {
           errors: BaseQueryError;
        };
        error: string;
     };
