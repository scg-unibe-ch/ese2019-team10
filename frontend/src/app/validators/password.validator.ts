import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {

  static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = formGroup.controls[key] as FormControl;

        if (val === undefined) {
          val = control.value;
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}
