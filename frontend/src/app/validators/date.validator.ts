import {AbstractControl} from '@angular/forms';

export class DateValidator {

  /**
   *   Validate dates of the format DD/MM/YYYY
   */
  static date(c: AbstractControl): { [key: string]: boolean } {
    const value = c.value;
    if (value && typeof value === 'string') {
      const match = value.match(/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/);
      if (!match) {
        return {datePattern: true};
      }
      const date = new Date(`${match[3]}-${match[2]}-${match[1]}`);
      if (isNaN(date.getTime())) {
        return {datePattern: true};
      }
    }
    return null;
  }

}
