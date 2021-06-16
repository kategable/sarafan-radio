import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import * as AccountActions from './../+state/account.actions';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
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
  @ViewChild('serviceInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

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
    serviceCtrl: ['']
  });

  get serviceCtrl(): FormControl {
    return this.secondFormGroup.get("serviceCtrl") as FormControl;
  }

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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  todos = [
    { name: 'Woman Haircut', image: './assets/unDraw/jewelry_designer.svg' },
    { name: 'Kids Haircut', image: './assets/unDraw/jewelry_designer.svg' },
    { name: 'Nails', image: './assets/unDraw/barber.svg' },
    { name: 'Facial', image: './assets/unDraw/barber.svg' },
    { name: 'Man Haircut', image: './assets/unDraw/barber.svg' },
    { name: 'Photographer', image: './assets/unDraw/photo.svg' },
    { name: 'Realtor', image: './assets/unDraw/Realtor.svg' },
  ];


  constructor(private store: Store,
    private _formBuilder: FormBuilder,) { }

    ngOnInit() {
      this.mainFormGroup = this._formBuilder.group({
        firstFormGroup: this.firstFormGroup,
        secondFormGroup: this.secondFormGroup,
        thirdFormGroup: this.thirdFormGroup,
      });
      this.load();

    }

    load(): void {
      let data: any = JSON.parse(localStorage.getItem('formdata'));
      if(data)  this.mainFormGroup.patchValue(data);
    }
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

    done = [];
    submit() {
      console.log("asdasd");

      localStorage.setItem('formdata', JSON.stringify(this.mainFormGroup.value));
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
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      // Add our fruit
      if (value) {
        this.todos.push({name:value, image:''});
      }

      // Clear the input value
      event.chipInput!.clear();

      this.serviceCtrl.setValue(null);
    }

    remove(value: string): void {
      const index = this.todos.indexOf({name : value, image: ''});

      if (index >= 0) {
        this.todos.splice(index, 1);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.todos.push({name: event.option.viewValue, image: ''});
      this.fruitInput.nativeElement.value = '';
      this.serviceCtrl.setValue(null);
    }

   // private _filter(value: string): string[] {
    //  const filterValue = value.toLowerCase();

     // return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);

   // }
}
