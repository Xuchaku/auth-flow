import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserShema } from './model/types';

const initialState: UserShema = {
   email: '',
   password: '',
   user: null,
};

const userSlice = createSlice({
   name: 'userSlice',
   initialState,
   reducers: {
      setUserMainInfo: (state, action: PayloadAction<Pick<UserShema, 'email' | 'password'>>) => {
         state.email = action.payload.email;
         state.password = action.payload.password;
      },
      setUserBasicInfo: (state, action: PayloadAction<User>) => {
         state.user = action.payload;
      },
   },
});

export const { reducer: userReducer } = userSlice;
export const { setUserMainInfo, setUserBasicInfo } = userSlice.actions;
