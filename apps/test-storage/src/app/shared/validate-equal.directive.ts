import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appValidateEqual]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateEqualDirective,
      multi: true
    }
  ]
})
export class ValidateEqualDirective implements Validator {

  @Input() public appValidateEqual!: string;
  @Input() public reverse!: string;

  private get isReverse(): boolean {
    if (!this.reverse) {
      return false;
    }
    return this.reverse === 'true' ? true : false;
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.parent?.get(this.appValidateEqual);

    if (controlToCompare && controlToCompare.value !== control.value && !this.isReverse) {
      return { notEqual: true };
    }

    if (controlToCompare && controlToCompare.value === control.value && this.isReverse) {
      delete controlToCompare.errors?.notEqual;
      if (controlToCompare.errors && !Object.keys(controlToCompare.errors).length) {
        controlToCompare.setErrors(null);
      }

    }

    if (controlToCompare && controlToCompare.value !== control.value && this.isReverse) {
      controlToCompare.setErrors({ notEqual: true });
    }

    return null;
  }

}
