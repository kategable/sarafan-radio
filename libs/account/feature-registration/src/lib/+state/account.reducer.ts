import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AccountActions from './account.actions';
import { AccountEntity } from './account.models';

export const ACCOUNT_FEATURE_KEY = 'account';

export interface State extends EntityState<AccountEntity> {
  selectedId?: string | number; // which Account record has been selected
  loaded: boolean; // has the Account list been loaded
  error?: string | null; // last known error (if any)
}

export interface AccountPartialState {
  readonly [ACCOUNT_FEATURE_KEY]: State;
}

export const accountAdapter: EntityAdapter<AccountEntity> = createEntityAdapter<AccountEntity>();

export const initialState: State = accountAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const accountReducer = createReducer(
  initialState,
  on(AccountActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AccountActions.loadAccountSuccess, (state, { account }) =>
    accountAdapter.setAll(account, { ...state, loaded: true })
  ),
  on(AccountActions.loadAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountActions.create, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AccountActions.createAccountSuccess, (state, { account }) =>
    accountAdapter.addOne(account, { ...state, loaded: true , selectedId: account.id})
  ),
  on(AccountActions.createAccountFailure, (state, { error }) => ({
    ...state,
    selectedId: null,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return accountReducer(state, action);
}
