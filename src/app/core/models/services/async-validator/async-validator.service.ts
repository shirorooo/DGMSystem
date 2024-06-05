import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorService {

  constructor() { }

  forbiddenNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(2000), // Simulate async operation
      map(value => {
        return value === 'forbidden' ? { forbiddenName: true } : null;
      })
    );
  }
}
