import { ValidatorFn, AbstractControl } from '@angular/forms';
import { isValidNumber, parseIncompletePhoneNumber, formatIncompletePhoneNumber } from "libphonenumber-js";

export function phoneValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} =>{
        return isValidNumber(
            parseIncompletePhoneNumber(
             formatIncompletePhoneNumber(control.value+"" || "", 'NG')
            ), 'NG'
        )? null: {
            phoneValidator: {
                actualValue: control.value,
                meesage: "invalid phone number"
            }
        }

    }
}