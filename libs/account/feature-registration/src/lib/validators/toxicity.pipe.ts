import { ToxicityPipe } from 'ngx-tfjs';
import { Injectable } from "@angular/core";

@Injectable({providedIn : 'root'})
export class MyToxicityPipe extends ToxicityPipe {
  transform(value) {
    return super.transform(value);
  }
}
