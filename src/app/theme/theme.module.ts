import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { NbSidebarModule, NbMenuModule, NbThemeModule, NbIconModule, NbSelectModule, NbActionsModule, NbLayoutModule } from '@nebular/theme';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SettingModule } from '../setting/setting.module';

const NB_MODULES = [
  NbLayoutModule,
  NbThemeModule,
  NbSidebarModule,
  NbIconModule,
  NbSelectModule,
  NbEvaIconsModule,
  NbThemeModule
  
];

const OTHER_MODULES =[
  CommonModule
];

const APP_MODULE = [
  SettingModule
]

const declarations = [
  HeaderComponent,
  SidebarComponent,
  SubheaderComponent
];

const exports = [
  HeaderComponent,
  SidebarComponent,
  SubheaderComponent
];

@NgModule({
  declarations: [
    ...declarations
  ],
  imports: [
    ...NB_MODULES,
    ...OTHER_MODULES,
    ...APP_MODULE
  ],
  exports: [
    ...exports
  ]
})
export class ThemeModule { }
