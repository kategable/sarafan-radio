import { TestBed, waitForAsync } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';

import { ProvidersEffects } from './providers.effects';
import * as ProvidersActions from './providers.actions';
import { hot } from 'jasmine-marbles';

describe('ProvidersEffects', () => {
  let actions: Observable<any>;
  let effects: ProvidersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ProvidersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(ProvidersEffects);
  });

  describe('loadProviders$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProvidersActions.loadProviders() });

      const expected = hot('-a-|', {
        a: ProvidersActions.loadProvidersSuccess({ providers: [] }),
      });

      expect(effects.loadProviders$).toBeObservable(expected);
    });
  });
});
