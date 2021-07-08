import { MyToxicityPipe } from './toxicity.pipe';
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { ToxicityPipe, ToxicityService } from "ngx-tfjs";
import { Observable, of } from "rxjs";
import { map, debounceTime, take, switchMap, catchError } from "rxjs/operators";


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
        debugger;
        return of(null);
      } else if (control.value === initialValue) {
        debugger;
        return of(null);
      } else {
        debugger;
        return control.valueChanges.pipe(
          debounceTime(500),
          take(1),
          switchMap(_ =>
            this.pipe.transform(control.value)
              .pipe(
                map((data: any) =>
                    {
                      console.log('toxic',data);
                      if(!data) return null;
                      let match = data["_value"].some((v: any)=> v["match"])
                      return match ? { toxic: true } : null;
                    }
                ) )
              )
          )
      }
    };
  }

}
