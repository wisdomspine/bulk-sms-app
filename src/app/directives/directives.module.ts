import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BytesPipe } from './pipes/bytes.pipe';
import { TelFormatterDirective } from './attributes/tel-formatter.directive';
import { ExcerptPipe } from './pipes/excerpt.pipe';

const DECLARATIONS =[
  BytesPipe,
  TelFormatterDirective,
  ExcerptPipe
];

const NG_IMPORTS = [
  CommonModule
];

const NB_IMPORTS = [
  

];

const APP_IMPORTS =[

];

const OTHER_IMPORTS = [

];

const PROVIDERS =[

];

const EXPORTS = [
  BytesPipe,
  TelFormatterDirective,
  ExcerptPipe
];
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...NG_IMPORTS, ...NB_IMPORTS, ...APP_IMPORTS, ...OTHER_IMPORTS],
  providers: [...PROVIDERS],
  exports: [...EXPORTS]
})
export class DirectivesModule { }
