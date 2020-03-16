import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpreadSheetService } from './spread-sheet.service';
import { FileReaderService } from './file-reader.service';

const NG_IMPORTS = [
  CommonModule
];

const APP_IMPORTS = [ 

];

const OTHER_IMPORTS = [

];

const DECLARATIONS = [

];

const PROVIDERS = [
  SpreadSheetService,
  FileReaderService
];

const EXPORTS = [
  
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    ...NG_IMPORTS,
    ...OTHER_IMPORTS,
    ...APP_IMPORTS
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    ...EXPORTS
  ]
})
export class UtilsModule { }
