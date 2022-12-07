import * as fromRoot from './root.reducer';

export interface RootState {
  app: fromRoot.AppState;
}
export const user = (state: RootState) => {
  return state.app.user;
};
export const isAuthenticated = (state: RootState) => {
  return state.app.user?.loggedIn;
};
export const isLoading = (state: RootState) => {
  return !state.app.loaded;
};
