import { Injectable, Compiler, Injector } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as DebugActions from './debug.actions';
import { switchMap } from 'rxjs/operators';
import { DevToolsModule, LOGROCKET_INIT_KEY } from './dev-tools-module';
import * as LogRocket from 'logrocket'; 
import { changeLink } from '../+state/root.actions';

@Injectable()
export class DebugEffects {
  constructor(
    private actions$: Actions,
    private compiler: Compiler,
    private injector: Injector
  ) {}

  debugAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DebugActions.enableDebug),
      switchMap(async () => {
        const m = this.compiler.compileModuleSync<DevToolsModule>(
          DevToolsModule
        );
        m.create(this.injector);
        LogRocket.init(LOGROCKET_INIT_KEY);
        return changeLink({ link: '' });
      })
    )
  );
}
