import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ProvidersActions from './providers.actions';
import { map } from 'rxjs/operators';
import { ProviderDataService } from '../../infrastructure/provider.data.service';

@Injectable()
export class ProvidersEffects {

  loadProviders$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProvidersActions.loadProviders),
    fetch({
      run: (action) => {
        return this.providerDataService.load().pipe(map(i=>{
          return ProvidersActions.loadProvidersSuccess({ providers: i });
        }))
      },
      onError: (action, error) => {
        console.error('Error', error);
        return ProvidersActions.loadProvidersFailure({ error });
      }
    })
  )
);

  constructor(private actions$: Actions,private providerDataService: ProviderDataService) {}
}
