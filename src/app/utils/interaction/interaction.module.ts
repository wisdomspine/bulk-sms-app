import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { ProgressComponent } from './components/progress/progress.component';
import { NotifyComponent } from './components/notify/notify.component';
import { StatusComponent } from './components/status/status.component';
import { InteractionService } from './interaction.service';
import { NbCardModule, NbIconModule, NbDialogModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const NG_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

const APP_IMPORTS = [ 

];

const OTHER_IMPORTS = [

];

const NB_IMPORTS = [
  NbCardModule,
  NbIconModule,
  // NbDialogModule.forChild(),
  NbButtonModule,
  NbDialogModule,
  NbInputModule
];

const DECLARATIONS = [
  ConfirmComponent,
  ProgressComponent,
  PromptComponent,
  StatusComponent,
  NotifyComponent  
];

const PROVIDERS = [
  InteractionService
];

const EXPORTS = [
  // ConfirmComponent,
  // ProgressComponent,
  // PromptComponent,
  // StatusComponent,
  // NotifyComponent
];

const ENTRY_COMPONENTS =[
  ConfirmComponent,
  ProgressComponent,
  PromptComponent,
  StatusComponent,
  NotifyComponent
]

@NgModule({
  imports: [
    ...NG_IMPORTS,
    ...NB_IMPORTS,
    ...OTHER_IMPORTS,
    ...APP_IMPORTS
  ],

  providers: [
    ...PROVIDERS
  ],

  exports: [
    ...EXPORTS
  ],

  declarations: [
    ...DECLARATIONS
  ],

  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
})
export class InteractionModule { }
