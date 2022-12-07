import { Component, HostListener } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  changeLink,
  LoginAction,
  LogoutAction,
} from '../../+state/root.actions';
import { isLoading, RootState, user } from '../../+state/root.selectors';
import { ApiService } from '../../api.service';

@Component({
  selector: 'sarafan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<RootState>, private api: ApiService) {}

  user$ = this.store.pipe(select(user));
  loading$ = this.store.pipe(select(isLoading));

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
    this.api.ping$().subscribe((res) => (this.responseJson = res));
  }
  changeRoute(link) {
    this.store.dispatch(changeLink({ link }));
  }
  onDebug() {
    this.store.dispatch(changeLink({ link: 'debug' }));
    this.isDebugVisible = false;
    console.log('sadas');
  }
  @HostListener('document:keydown', ['$event'])
  keypress(e: KeyboardEvent) {
    if (e.key === 'F1') {
      this.isDebugVisible = true;
    }
  }
}
