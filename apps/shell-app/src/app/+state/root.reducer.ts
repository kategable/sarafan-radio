import { createReducer, on, Action } from '@ngrx/store';

import * as RootActions from './root.actions';
import { UserEntity } from './user-entity.type';
export interface AppState {
  user: UserEntity;
  loaded: boolean;
  error?: string | null; // last none error (if any)
}
export const initialState: AppState = {
  user: null,
  error: null,
  loaded: false
};
export const rootReducer = createReducer(
  initialState,
  on(RootActions.LoginAction, state => ({
    ...state,    loaded: false,    error: null,   user: null  })),
  on(RootActions.loadUserSuccess, (state, { userData }) => ({
    ...state,    loaded: true,    error: null,    user: userData  })),
  on(RootActions.loadUserFailure, (state, { error }) => ({
    ...state,    error  }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return rootReducer(state, action);
}
