import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ACCOUNT_FEATURE_KEY, State, accountAdapter } from './account.reducer';

// Lookup the 'Account' feature state managed by NgRx
export const getAccountState = createFeatureSelector<State>(
  ACCOUNT_FEATURE_KEY
);

const { selectAll, selectEntities } = accountAdapter.getSelectors();

export const getAccountLoaded = createSelector(
  getAccountState,
  (state: State) => state.loaded
);

export const getAccountError = createSelector(
  getAccountState,
  (state: State) => state.error
);

export const getAllAccount = createSelector(getAccountState, (state: State) =>
  selectAll(state)
);

export const getAccountEntities = createSelector(
  getAccountState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAccountState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAccountEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
