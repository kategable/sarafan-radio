import { AccountEntity } from './account.models';
import * as AccountActions from './account.actions';
import { State, initialState, reducer } from './account.reducer';

describe('Account Reducer', () => {
  const createAccountEntity = (id: string, name = ''): AccountEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Account actions', () => {
    it('loadAccountSuccess should return set the list of known Account', () => {
      const account = [
        createAccountEntity('PRODUCT-AAA'),
        createAccountEntity('PRODUCT-zzz'),
      ];
      const action = AccountActions.loadAccountSuccess({ account });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
