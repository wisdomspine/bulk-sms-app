import { Gender } from '../enum/gender.enum';
import { parsePhoneNumberFromString, parseDigits } from "libphonenumber-js";
import { Model } from '../abstracts/model';

export class Contact extends Model{
    name: string;
    phone: string;
    gender: Gender

    get contact(){
        // console.log(this)
        return this.name? this.name : this.formatInternational;
    }

    get formatNational(){
        const parsed = parsePhoneNumberFromString(this.phone || '', 'NG');
        return parsed.formatNational();
    }

    get formatInternational(){
        const parsed = parsePhoneNumberFromString(this.phone || '', 'NG');
        return parsed.formatInternational();
    }

    get parsedPhone(){
        const parsed = parsePhoneNumberFromString(this.phone || '');
        return parsed.number.toString();
    }

    get phoneDigits(){
        return parseDigits(this.formatInternational);
    }

    get badge(){
        if(this.gender === Gender.MALE){
            return {status: 'primary', text: 'm'}
        }else if(this.gender === Gender.FEMALE){
            return {status: 'info', text: 'f'}
        }else {
            return {status: 'warning', text: 'o'}
        }
    }

    tr() {
        return this.phone;
    }
}