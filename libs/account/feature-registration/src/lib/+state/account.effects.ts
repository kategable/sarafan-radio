import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AccountFeature from './account.reducer';
import * as AccountActions from './account.actions';
import { Router } from '@angular/router';

@Injectable()
export class AccountEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AccountActions.loadAccountSuccess({ account: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AccountActions.loadAccountFailure({ error });
        },
      })
    )
  );
  createAccount$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AccountActions.create),
    fetch({
      run: (action) => {
     
        // Your custom service 'load' logic goes here. For now just return a success action...
        this.router.navigate(['/account']);
        return AccountActions.createAccountSuccess({ account: action.account });
      },

      onError: (action, error) => {
        console.error('Error', error);
        return AccountActions.createAccountFailure({ error });
      },
    })
  )
);
  constructor(private actions$: Actions,private router: Router) {}
}
