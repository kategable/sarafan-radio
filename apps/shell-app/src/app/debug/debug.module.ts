import { NgModule } from '@angular/core';
import { DebugComponent } from './debug.component';
import { RouterModule } from '@angular/router';
import { DevToolsModule } from './dev-tools-module';
@NgModule({
  imports: [ 
      RouterModule.forChild([{ path:'',component:DebugComponent}]),
      DevToolsModule
  ],
  declarations: [DebugComponent],
  exports: [DebugComponent]

})
export class DebugModule {
  constructor(){}
  
}
