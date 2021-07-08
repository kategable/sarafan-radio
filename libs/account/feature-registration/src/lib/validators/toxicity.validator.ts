import { MyToxicityPipe } from './toxicity.pipe';
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Prediction, ToxicityPipe, ToxicityService } from "ngx-tfjs";
import { Observable, of } from "rxjs";
import { map, debounceTime, take, switchMap, catchError, distinctUntilChanged } from "rxjs/operators";


function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value === null || value.length === 0;
}

@Injectable({
  providedIn: "root"
})
export class AsyncToxicValidator {

  constructor(private readonly pipe: MyToxicityPipe) {


  }

  toxicityValidator(initialValue: string = ""): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      if (isEmptyInputValue(control.value)) {
        return of(null);
      } else if (control.value === initialValue) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          distinctUntilChanged(),
          debounceTime(500),
          take(1),
          switchMap(_ =>
            this.pipe.transform(control.value)
              .pipe(
                map((data: Prediction[]) =>
                    {
                      if(!data) return null;
                      console.log("toxicity-checker",data);
                      let match = data.some((v: Prediction)=> v.match);
                      let r =  match ? { toxic: true } : null;
                      control.setErrors(r);
                      return r;

                    }
                ),catchError(() => of(null)) )
              )
          )
      }
    };
  }

}
