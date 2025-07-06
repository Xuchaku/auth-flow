import { StateSchema } from '@app/store/model/types';
import { createSelector } from '@reduxjs/toolkit';

export const getUser = (state: StateSchema) => state.user;

export const getUserEmail = createSelector(getUser, (state) => state.email);
export const getUserBasicInfo = createSelector(getUser, (state) => state.user);
