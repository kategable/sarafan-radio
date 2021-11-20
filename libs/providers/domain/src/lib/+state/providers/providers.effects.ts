import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as ProvidersActions from './providers.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProviderDataService } from '../../infrastructure/provider.data.service';

@Injectable()
export class ProvidersEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProvidersActions.loadProviders),
      switchMap(() =>
        this.providerDataService.load().pipe(
          map((i) => ProvidersActions.loadProvidersSuccess({ providers: i })),
          catchError(async (error) => ProvidersActions.loadProvidersFailure({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private providerDataService: ProviderDataService
  ) {}
}
