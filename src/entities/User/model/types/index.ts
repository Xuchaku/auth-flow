import { DataLoginAuth } from '@entities/Auth/model/types';

export type User = {
   id: number;
   name: string;
   username: string;
   email: string;
   photo: string;
};

export type UserShema = {
   email: string;
   password: string;
   user: User | null;
};

export type BasicInfoRes = {
   data: User;
};

export type DataLoginAuthRes = {
   data: DataLoginAuth;
};
