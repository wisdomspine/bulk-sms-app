import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpreadSheetService } from './spread-sheet.service';
import { FileReaderService } from './file-reader.service';
import { InteractionModule } from './interaction/interaction.module';

const NG_IMPORTS = [
  CommonModule
];

const APP_IMPORTS = [ 
  InteractionModule
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
  InteractionModule
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
