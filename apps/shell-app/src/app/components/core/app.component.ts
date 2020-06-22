import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../+state/root.reducer';
import { Store, select } from '@ngrx/store';
import {
  LoginAction,
  LogoutAction,
  changeLink
} from '../../+state/root.actions';
import { selectUser, RootState } from '../../+state/root.selectors';
import { ApiService } from '../../api.service';

@Component({
  selector: 'saraphan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';
  responseJson: string;

  constructor(
    private store: Store<RootState>,
    private api: ApiService
  ) {}
  user$ = this.store.pipe(select(selectUser));

  showShell = true;
  login() {
    this.store.dispatch(LoginAction({ url: '' }));
  }
  logout() {
    this.store.dispatch(LogoutAction());
  }
  register() {
    this.store.dispatch(changeLink({ link: 'account' }));
  }
  pingApi() {
    this.api.ping$().subscribe(res => (this.responseJson = res));
  }
  changeRoute(link) {
    this.store.dispatch(changeLink({ link }));
  }

  onDebug(){
    this.store.dispatch(changeLink({ link:'debug' }));

  }
}
