import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { changeLink, LoginAction } from '../../+state/root.actions';
import { RootState, user } from '../../+state/root.selectors';

@Component({
  selector: 'sarafan-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  constructor(private store: Store<RootState>) {}
  user$ = this.store.pipe(select(user));

  navigate(link) {
    this.store.dispatch(changeLink({ link }));
  }
  login() {
    this.store.dispatch(LoginAction({ url: '' }));
  }
}
