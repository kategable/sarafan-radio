import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';

import { AccountEffects } from './account.effects';
import * as AccountActions from './account.actions';
import { hot } from 'jasmine-marbles';

describe('AccountEffects', () => {
  let actions: Observable<any>;
  let effects: AccountEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AccountEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AccountEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AccountActions.init() });

      const expected = hot('-a-|', {
        a: AccountActions.loadAccountSuccess({ account: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
