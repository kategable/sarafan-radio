import { createAction, props } from '@ngrx/store';
import { AccountEntity } from './account.models';

export const init = createAction('[Account Page] Init');

export const loadAccountSuccess = createAction(
  '[Account/API] Load Account Success',
  props<{ account: AccountEntity[] }>()
);

export const loadAccountFailure = createAction(
  '[Account/API] Load Account Failure',
  props<{ error: any }>()
);

export const create = createAction('[Account Page] Create account',
props<{ account: AccountEntity }>()
);

export const createAccountSuccess = createAction(
  '[Account/API] Create Account Success',
  props<{ account: AccountEntity }>()
);

export const createAccountFailure = createAction(
  '[Account/API] Create Account Failure',
  props<{ error: any }>()
);
