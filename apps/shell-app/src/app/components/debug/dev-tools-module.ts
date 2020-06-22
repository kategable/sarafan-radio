import { NgModule } from '@angular/core';
import { StoreDevtoolsModule, StoreDevtools } from '@ngrx/store-devtools';  
@NgModule({
  imports: [ 
    StoreDevtoolsModule.instrument({  
      maxAge: 25, // Retains last 25 states
      logOnly: true, })  ,
     
  ], 
})
export class DevToolsModule {
  constructor(private storeDevtools: StoreDevtools){console.log("in dev tools module");
  }
}
