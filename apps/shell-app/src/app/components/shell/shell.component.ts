import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RootState, selectUser } from '../../+state/root.selectors';
import { changeLink, LoginAction } from '../../+state/root.actions';

@Component({
  selector: 'sarafan-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  constructor(private store: Store<RootState>) {}
  user$ = this.store.pipe(select(selectUser));

  navigate(link) {
    this.store.dispatch(changeLink({ link }));
  }
  login(){
    this.store.dispatch(LoginAction({ url: '' }));
  }
}
