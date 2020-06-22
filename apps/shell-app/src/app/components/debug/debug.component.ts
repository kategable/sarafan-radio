import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../+state/root.selectors';
import { enableDebug } from './debug.actions';
import { changeLink } from '../../+state/root.actions';

@Component({
  templateUrl: './debug.component.html',
  selector: 'saraphan-debug',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
  constructor(private readonly store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.dispatch(enableDebug());
  }
  goHome() {
    this.store.dispatch(changeLink({ link: '' }));
  }
}
