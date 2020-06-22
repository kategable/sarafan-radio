import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RootActions from './root.actions';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RootEffects {
  loginAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RootActions.LoginAction),
      fetch({
        run: () => {
          this.auth.login();
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RootActions.loadUserFailure({ error });
        }
      })
    )
  );

  logoutAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RootActions.LogoutAction),
      fetch({
        run: () => {
          this.auth.logout();
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RootActions.genericFailure({ error });
        }
      })
    )
  );

  linkChangeAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RootActions.changeLink),
        fetch({
          run: routeParam => {
            this.router.navigate(['/' + routeParam.link]);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.localAuthSetup();
  }
}
