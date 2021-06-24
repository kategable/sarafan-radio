import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../+state/root.reducer';
import { Store, select } from '@ngrx/store';
import {
  LoginAction,
  LogoutAction,
  changeLink
} from '../../+state/root.actions';
import { selectUser, RootState, selectLoading } from '../../+state/root.selectors';
import { ApiService } from '../../api.service';

@Component({
  selector: 'sarafan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<RootState>, private api: ApiService) {}
  title = 'shell';
  responseJson: string;
  user$ = this.store.pipe(select(selectUser));
  loading$ = this.store.pipe(select(selectLoading));
  showShell = true;
  isDebugVisible = true;
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
  onDebug() {
    this.store.dispatch(changeLink({ link: 'debug' }));
    this.isDebugVisible = false;
  }
  @HostListener('document:keydown', ['$event'])
  keypress(e: KeyboardEvent) {
    if (e.key === 'F1') {
      this.isDebugVisible = true;
    }
  }
}
