import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/core/registration.component';
import { SetupAccountComponent } from './setup-account/setup-account.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
  { path: 'setup', component: SetupAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
