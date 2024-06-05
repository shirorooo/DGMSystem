import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsoDateFormatterService {

  constructor() { }
  

  /**
   * The function `formatter` takes an optional date parameter and returns a formatted string in the
   * format "YYYY-MM-DD".
   * @param {Date} [date] - The `formatter` function takes an optional `date` parameter of type `Date`.
   * If a `date` is provided, the function will format that date into a string in the format
   * "YYYY-MM-DD" (year-month-day). If no `date` is provided, the function will default to
   * @returns The `formatter` function returns a formatted date string in the format 'YYYY-MM-DD'. The
   * date used for formatting is either the current date if no argument is provided, or the date passed
   * as an argument to the function.
   */
  public formatter(date?: Date): string{
    let month = new Date().toLocaleString('default', {month: '2-digit'})
    let day = new Date().toLocaleString('default', {day: '2-digit'})
    let year = new Date().getFullYear()

    if(date !== undefined){
      month = date.toLocaleString('default', {month: '2-digit'})
      day = date.toLocaleString('default', {day: '2-digit'})
      year = date.getFullYear()
    }

    return `${year}-${month}-${day}`
  }
}
