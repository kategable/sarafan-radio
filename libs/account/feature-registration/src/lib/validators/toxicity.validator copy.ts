import { MyToxicityPipe } from './toxicity.pipe';
import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { ToxicityPipe, ToxicityService } from "ngx-tfjs";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AsyncToxicityValidator1 implements AsyncValidator {


  constructor(private readonly pipe: MyToxicityPipe) {


  }
  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.pipe.transform(ctrl.value).pipe(
      map(data => {
        console.log(data);
        if(!data) return null;
        let match = data["_value"].some((v: any)=> v["match"])
        return match ? { toxic: true } : null;
      }),
      catchError(() => of(null))
    );
  }
}
