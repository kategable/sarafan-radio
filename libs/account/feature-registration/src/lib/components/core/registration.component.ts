import { create } from './../../+state/account.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { getSelected } from '@sarafan/account/feature-registration';

@Component({
  selector: 'account-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegistrationComponent implements OnInit {
  isPitching = false;



  selected$ = this.store.select(getSelected);
  constructor(
    private store: Store,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {

  }

  setup(){
    this.router.navigate(['/account/setup']);
  }

  gohome() {
    this.router.navigate(['/']);
  }

}
