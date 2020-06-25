import { Injectable, Compiler, Injector } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as DebugActions from './debug.actions';
import { exhaustMap } from 'rxjs/operators';
import {  LOGROCKET_INIT_KEY } from './dev-tools-module';
import * as LogRocket from 'logrocket'; 
import { changeLink } from '../+state/root.actions';

@Injectable()
export class DebugEffects {
  constructor(
    private actions$: Actions, 
  ) {}

  debugAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DebugActions.enableDebug),
      exhaustMap(async () => {
        LogRocket.init(LOGROCKET_INIT_KEY);
        return changeLink({ link: '' });
      })
    )
  );
}
