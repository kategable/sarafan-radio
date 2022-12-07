import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { catchError, concatMap, shareReplay, tap } from 'rxjs/operators';
import * as RootActions from '../../+state/root.actions';
import { AppState } from '../../+state/root.reducer';
import { UserEntity } from '../../+state/user-entity.type';
import { IEnvironment } from '../auth.module';

//import { State } from '../../root-store/reducers/reducer';
//import * as StoreActions from '../../root-store/actions/actions'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //constructor(private router: Router,private store: Store<State>,  @Inject('env') private environment: IEnvironment) { }
  constructor(
    private router: Router,
    @Inject('env') private environment: IEnvironment,
    private store: Store<AppState>
  ) {}

  // Create an observable of Auth0 instance of client
  auth0Client$ = (
    from(
      createAuth0Client({
        domain: this.environment.authDomain,
        client_id: this.environment.authClient,
        redirect_uri: this.environment.callback,
      })
    ) as Observable<Auth0Client>
  ).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError((err) => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated()))
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status

  // getUser$() is a method because options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options)))
    );
  }

  localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user data
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    const checkAuthSub = checkAuth$.subscribe(
      (response: { [key: string]: any } | boolean) => {
        // If authenticated, response will be user object
        // If not authenticated, response will be 'false'
        // Set subjects appropriately
        if (response) {
          console.log('response:', response);
          const user = response as UserEntity;
          user.loggedIn = true;
          this.userProfileSubject$.next(user);
          this.store.dispatch(RootActions.loadUserSuccess({ userData: user }));
        } else {
          this.store.dispatch(
            RootActions.loadUserFailure({ error: 'unable to login' })
          );
        }

        // Clean up subscription
        checkAuthSub.unsubscribe();
      }
    );
  }
  login(redirectPath: string = '/'): Observable<any> {
    return of({});
  }
  login1(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: this.environment.callback,
        appState: { target: redirectPath },
      });
    });
  }

  handleAuthCallback() {
    // Only the callback component should call this method
    // Call when app reloads after user logs in with Auth0
    let targetRoute: string; // Path to redirect to after login processsed
    // Ensure Auth0 client instance exists
    const authComplete$ = this.auth0Client$.pipe(
      // Have client, now call method to handle auth callback redirect
      concatMap(() => this.handleRedirectCallback$),
      tap((cbRes) => {
        // Get and set target redirect route from callback results
        targetRoute =
          cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      }),
      concatMap(() => {
        // Redirect callback complete; create stream
        // returning user data and authentication status
        return combineLatest(this.getUser$(), this.isAuthenticated$);
      })
    );
    // Subscribe to authentication completion observable
    // Response will be an array of user and login status
    authComplete$.subscribe(([user, loggedIn]) => {
      // Update subjects and loggedIn property
      user.loggedIn = loggedIn;
      this.userProfileSubject$.next(user);
      console.log('user', user);
      this.store.dispatch(RootActions.loadUserSuccess({ userData: user }));

      // Redirect to target route after callback processing
      this.router.navigate([targetRoute]);
    });
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: this.environment.authClient,
        returnTo: this.environment.path,
      });
    });
  }
  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }
}
