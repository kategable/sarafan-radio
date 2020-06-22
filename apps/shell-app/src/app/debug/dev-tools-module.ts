import { NgModule } from '@angular/core';
import { StoreDevtoolsModule, StoreDevtools } from '@ngrx/store-devtools';
import { USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import * as LogRocket from 'logrocket';
import createNgrxMiddleware from 'logrocket-ngrx';
import { MetaReducer, State } from '@ngrx/store'; 
import { RootState } from '../+state/root.selectors';
const logrocketMiddleware = createNgrxMiddleware(LogRocket, {});

export const metaReducers: MetaReducer<any>[] = [];

export function getMetaReducers(): MetaReducer<RootState>[] {
  return metaReducers.concat([logrocketMiddleware]);
}
export const LOGROCKET_INIT_KEY = '6riuqy/test-rad';

@NgModule({
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true
    })
  ],
  providers: [
  
    {
      provide: USER_PROVIDED_META_REDUCERS,
      useFactory: getMetaReducers
    }
  ]}
)
export class DevToolsModule {
  constructor(private storeDevtools: StoreDevtools) {
    // storeDevtools.refresh();
  }
}
