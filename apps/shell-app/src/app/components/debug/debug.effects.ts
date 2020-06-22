import { Injectable, Compiler, Injector, NgModuleFactoryLoader } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as DebugActions from './debug.actions';
import { switchMap } from 'rxjs/operators'; 
import { DevToolsModule } from './dev-tools-module';
import * as LogRocket from 'logrocket'; 

@Injectable()
export class DebugEffects {
  constructor(
    private actions$: Actions,
    private compiler: Compiler,
    private injector: Injector,
  ) {}

  debugAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DebugActions.enableDebug),
        switchMap(async () => { 
        //  const m = this.compiler.compileModuleSync<DevToolsModule>(DevToolsModule);
       //   m.create(this.injector);
          
          LogRocket.init('6riuqy/test-rad');
        })
      ),
    { dispatch: false }
  );
}
