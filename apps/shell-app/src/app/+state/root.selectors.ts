import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap
} from '@ngrx/store';
import* as fromRoot from './root.reducer';

export interface RootState {
  app: fromRoot.AppState
}
export const selectUser = (state: RootState) => {
  return state.app.user;
};
export const isAuthenticated = (state: RootState) => {
  return state.app.user?.loggedIn;
};
export const selectLoading = (state: RootState) => {
  return !state.app.loaded;
};
