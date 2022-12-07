import { NgModule } from '@angular/core';
import { StoreModule, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RootEffects } from './+state/root.effects';
import * as fromRoot from './+state/root.reducer';
import { DebugEffects } from './debug/debug.effects';



@NgModule({
  imports: [
    StoreModule.forRoot(
      { app: fromRoot.reducer },
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([RootEffects, DebugEffects]),
    //environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    RootEffects,
    // {
    //   provide: USER_PROVIDED_META_REDUCERS,
    //   useFactory: getMetaReducers
    // }
  ]
})
export class RootStoreModule {}
