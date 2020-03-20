import { Directive, Input, ElementRef, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formatIncompletePhoneNumber, CountryCode } from "libphonenumber-js";

@Directive({
  selector: 'input[appTelFormatter][formControl]'
})
export class TelFormatterDirective  implements OnInit{
  @Input() appTelFormatter:CountryCode = 'NG';
  @Input() formControl: FormControl

  constructor(

    ) { }

  ngOnInit(): void {
    this.formatNumber();
  }

  @HostListener('input') onInput(){
    this.formatNumber()
  }

  private formatNumber(){
    if(this.formControl.value){
      this.formControl.setValue(formatIncompletePhoneNumber(this.formControl.value+"", this.appTelFormatter))
    }
  }

}
