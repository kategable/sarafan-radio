import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';

import * as AccountActions from './../+state/account.actions';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'account-setup-account',
  templateUrl: './setup-account.component.html',
  styleUrls: ['./setup-account.component.scss']
})
export class SetupAccountComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  mainFormGroup: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstFormGroup: FormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    lastCtrl: ['', Validators.required],
    compCtrl: [''],
    emailCtrl: this.emailFormControl,
  });
  secondFormGroup: FormGroup = this._formBuilder.group({
    addressCtrl: ['', Validators.required],
    descCtrl: ['', Validators.required],
  });
  thirdFormGroup: FormGroup = this._formBuilder.group({
    scheduleCtrl: [''],
  });

  week = {
    name: 'Weekdays',
    completed: false,
    subtasks: [
      { name: 'Monday', completed: false, color: 'primary' },
      { name: 'Tuesday', completed: false, color: 'primary' },
      { name: 'Wednesday', completed: false, color: 'primary' },
      { name: 'Thursday', completed: false, color: 'primary' },
      { name: 'Friday', completed: false, color: 'primary' },
    ],
  };
  weekend = {
    name: 'Weekend',
    completed: false,
    subtasks: [
      { name: 'Saturday', completed: false, color: 'primary' },
      { name: 'Saturday', completed: false, color: 'primary' },
    ],
  };
  allComplete: boolean = false;


  constructor(private store: Store,
    private _formBuilder: FormBuilder,) { }

    ngOnInit() {
      this.load();
      this.mainFormGroup = this._formBuilder.group({
        firstFormGroup: this.firstFormGroup,
        secondFormGroup: this.secondFormGroup,
        thirdFormGroup: this.thirdFormGroup,
      });
    }

    load(): void {}
    updateAllComplete() {
      this.allComplete =
        this.week.subtasks != null &&
        this.week.subtasks.every((t) => t.completed);
    }

    someComplete(): boolean {
      if (this.week.subtasks == null) {
        return false;
      }
      return (
        this.week.subtasks.filter((t) => t.completed).length > 0 &&
        !this.allComplete
      );
    }

    setAll(completed: boolean) {
      this.allComplete = completed;
      if (this.week.subtasks == null) {
        return;
      }
      this.week.subtasks.forEach((t) => (t.completed = completed));
    }
    todo = [
      { name: 'Jewelry designer', image: './assets/unDraw/jewelry_designer.svg' },
      { name: 'Salon services', image: './assets/unDraw/barber.svg' },
      { name: 'Photographer', image: './assets/unDraw/photo.svg' },
      { name: 'Realtor', image: './assets/unDraw/Realtor.svg' },
    ];

    done = [];
    submit() {
      console.log('mainFormGroup', this.mainFormGroup);
      this.store.dispatch(
        AccountActions.create({ account: { name: "test", id: null } })
      );
    }
    drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }

}
