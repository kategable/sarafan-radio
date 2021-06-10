import { Component, OnInit } from '@angular/core';
import { RegistrationFacade } from '@sarafan/account/domain';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective,NgForm } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {ErrorStateMatcher} from '@angular/material/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'account-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})

export class RegistrationComponent implements OnInit {
  isPitching = false;
  mainFormGroup: FormGroup;
  emailFormControl = new FormControl('',[Validators.required,Validators.email    ] );

  matcher = new MyErrorStateMatcher();
  firstFormGroup: FormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    lastCtrl: ['', Validators.required],
    compCtrl: [''],
    emailCtrl:this.emailFormControl
  });
  secondFormGroup: FormGroup = this._formBuilder.group({
    addressCtrl: ['', Validators.required],
    descCtrl: ['', Validators.required]
  });
  thirdFormGroup: FormGroup = this._formBuilder.group({
    scheduleCtrl: ['', Validators.required]
  });
  accountList$ = this.registrationFacade.accountList$;
  week = {
    name: 'Weekdays',
    completed: false,
    subtasks: [
      { name: 'Monday', completed: false, color: 'primary' },
      { name: 'Tuesday', completed: false, color: 'primary' },
      { name: 'Wednesday', completed: false, color: 'primary' },
      { name: 'Thursday', completed: false, color: 'primary' },
      { name: 'Friday', completed: false, color: 'primary' }
    ]
  };
  weekend = {
    name: 'Weekend',
    completed: false,
    subtasks: [
      { name: 'Saturday', completed: false, color: 'primary' },
      { name: 'Saturday', completed: false, color: 'primary' }
    ]
  };
  allComplete: boolean = false;

  constructor(
    private registrationFacade: RegistrationFacade,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
    this.mainFormGroup = this._formBuilder.group({
      firstFormGroup: this.firstFormGroup,
      secondFormGroup: this.secondFormGroup,
      thirdFormGroup: this.thirdFormGroup
    });
  }

  load(): void {
    this.registrationFacade.load();
  }
  updateAllComplete() {
    this.allComplete =
      this.week.subtasks != null && this.week.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.week.subtasks == null) {
      return false;
    }
    return (
      this.week.subtasks.filter(t => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.week.subtasks == null) {
      return;
    }
    this.week.subtasks.forEach(t => (t.completed = completed));
  }
  todo = [
    { name: 'Jewelry designer', image: 'assets/unDraw/jewelry_designer.svg' },
    { name: 'Salon services', image: 'assets/unDraw/barber.svg' },
    { name: 'Photographer', image: 'assets/unDraw/photo.svg' },
    { name: 'Realtor', image: 'assets/unDraw/Realtor.svg' }
  ];

  done = [];

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

  gohome(){
    this.router.navigate(['/']);

  }
}
