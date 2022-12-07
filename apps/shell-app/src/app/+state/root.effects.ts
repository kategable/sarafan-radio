import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import * as RootActions from './root.actions';

@Injectable()
export class RootEffects {
  loginAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RootActions.LoginAction),
      switchMap((action) => {
        return this.auth.login(action.).pipe(
          map((userData) => RootActions.loadUserSuccess(userData)),
          catchError((error) => of(RootActions.loadUserFailure(error)))
        );
      })
    )
  );

  linkChangeAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RootActions.changeLink),
        switchMap((routeParam) => {
          return this.router.navigate(['/' + routeParam.link]);
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

// logoutAction$ = createEffect(() =>
// this.actions$.pipe(
//   ofType(RootActions.LogoutAction),
//   map(()=>
//       this.auth.logout() ;
//     ),   { dispatch: false }),

// logoutAction$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(RootActions.LogoutAction),
//     fetch({
//       run: () => {
//         this.auth.logout();
//       },
//       onError: (action, error) => {
//         console.error('Error', error);
//         return RootActions.genericFailure({ error });
//       }
//     })
//   )
// );
