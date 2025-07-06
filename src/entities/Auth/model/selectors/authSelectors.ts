import { StateSchema } from '@app/store/model/types';
import { createSelector } from '@reduxjs/toolkit';

export const getAuth = (state: StateSchema) => state.auth;

export const getIsToken = createSelector(getAuth, (state) => state.isToken);
