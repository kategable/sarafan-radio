import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDomainModule } from '@sarafan/account/domain';
import {UiModule,MaterialModule } from '@sarafan/ui';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AccountRoutingModule } from './account-routing.module';

import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/core/registration.component';

@NgModule({
  imports: [
    CommonModule ,
    UiModule,
    AccountDomainModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    DragDropModule,
    AccountRoutingModule
  ],
  declarations: [RegistrationComponent],
  exports: [RegistrationComponent]
})
export class AccountFeatureRegistrationModule {}
