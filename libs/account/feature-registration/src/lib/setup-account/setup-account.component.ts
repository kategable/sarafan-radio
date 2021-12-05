import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { AccountEntity } from './../+state/account.models';
import { serviceData, Week, weekData } from '@sarafan/shared/util';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import * as AccountActions from './../+state/account.actions';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { of } from 'rxjs';
import { AsyncToxicValidator } from '../validators/toxicity.validator';
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
  styleUrls: ['./setup-account.component.scss'],
})
export class SetupAccountComponent implements OnInit {
  @ViewChild('serviceInput') serviceInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  matcher = new MyErrorStateMatcher();
  mainFormGroup: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  firstFormGroup: FormGroup = this._formBuilder.group({
    firstCtrl: new FormControl(
      { value: '', disabled: false },
      [Validators.required]
      //,[this.asyncValidator.toxicityValidator()]
    ),
    lastCtrl: ['', Validators.required],
    compCtrl: [''],
    emailCtrl: this.emailFormControl,
  });

  secondFormGroup: FormGroup = this._formBuilder.group({
    addressCtrl: ['', Validators.required],
    descCtrl: ['', Validators.required],
    serviceCtrl: [''],
  });

  get serviceCtrl(): FormControl {
    return this.secondFormGroup.get('serviceCtrl') as FormControl;
  }

  get firstNameControl(): FormControl {
    return this.firstFormGroup.get('firstCtrl') as FormControl;
  }
  get lastNameControl(): FormControl {
    return this.firstFormGroup.get('lastCtrl') as FormControl;
  }

  thirdFormGroup: FormGroup = this._formBuilder.group({
    scheduleCtrl: [''],
  });

  week: Week = weekData;
  servicesPresets = serviceData;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  presets$ = of(this.servicesPresets);
  services = [];
  constructor(
    private store: Store,
    private _formBuilder: FormBuilder,
    private readonly asyncValidator: AsyncToxicValidator
  ) {}

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
    if (data) {
      this.mainFormGroup.patchValue(data.form);
      this.services = data.services || [];
      this.week = data.schedule;
    }
  }

  submit() {
    let storage = {
      form: this.mainFormGroup.value,
      services: this.services,
      schedule: this.week,
    };

    localStorage.setItem('formdata', JSON.stringify(storage));
    if (this.mainFormGroup.invalid) return;
    const account: AccountEntity = {
      id: new Date().toString(),
      parentId: '',
      firstName: this.firstFormGroup.get('firstCtrl').value,
      lastName: this.firstFormGroup.get('lastCtrl').value,
      address: this.secondFormGroup.get('addressCtrl').value,
      email: this.firstFormGroup.get('emailCtrl').value,
      companyName: this.firstFormGroup.get('compCtrl').value,
      description: this.secondFormGroup.get('descCtrl').value,
      services: this.services.map((s) => s.name),
      schedule: this.week,
    };
    this.store.dispatch(AccountActions.create({ account }));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.servicesPresets.push({ name: value, image: '' });
    }

    // Clear the input value
    event.chipInput!.clear();

    this.serviceCtrl.setValue(null);
  }

  remove(value: string): void {
    const index = this.services.findIndex((t) => t.name === value);

    if (index >= 0) {
      this.services.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.services.push({ name: event.option.viewValue, image: '' });
    this.serviceInput.nativeElement.value = '';
    this.serviceCtrl.setValue(null);
  }
  setTime(i: number) {
    this.week.days[i].startTime = this.week.days[i - 1].startTime;
    this.week.days[i].endTime = this.week.days[i - 1].endTime;
    this.week.days[i].completed = true;
  }
  setStartTime(e, i: number) {
    this.week.days[i].startTime = e;
    this.week.days[i].completed = true;
  }
  setEndTime(e, i: number) {
    this.week.days[i].endTime = e;
  }
  // private _filter(value: string): string[] {
  //  const filterValue = value.toLowerCase();

  // return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);

  // }
}
