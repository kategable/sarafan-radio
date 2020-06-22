import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../+state/root.selectors'; 
import { enableDebug } from './debug.actions';

@Component({
  selector: 'saraphan-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

    
    constructor(private readonly store: Store<RootState>) { }

  ngOnInit(): void {
   this.store.dispatch(enableDebug());
  }

}
