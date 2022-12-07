import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginAction } from '../../../+state/root.actions';
import { isAuthenticated, RootState } from '../../../+state/root.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<RootState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    return this.store.pipe(select(isAuthenticated)).pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.store.dispatch(LoginAction({ url: state.url }));
        }
      })
    );
  }
}
