import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; 
import { DebugComponent } from './debug.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [ 
      RouterModule.forChild([{ path:'',component:DebugComponent}])
  ],
  declarations: [DebugComponent],
  exports: [DebugComponent]

})
export class DebugModule {
  constructor(){console.log("in debug");
  }
}
