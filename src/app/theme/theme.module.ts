import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { NbSidebarModule, NbMenuModule, NbThemeModule, NbIconModule, NbSelectModule, NbActionsModule, NbLayoutModule } from '@nebular/theme';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SettingModule } from '../setting/setting.module';
import { BrowserModule } from '@angular/platform-browser';

const NB_MODULES = [
  NbLayoutModule,
  NbThemeModule,
  NbSidebarModule,
  NbIconModule,
  NbSelectModule,
  NbEvaIconsModule,
  NbThemeModule,
  NbMenuModule,
  NbActionsModule
  
];

const NG_MODULES =[
  CommonModule,
  BrowserModule,
  RouterModule
];

const APP_MODULES = [
  SettingModule
]

const DECLARATIONS = [
  HeaderComponent,
  SidebarComponent,
  SubheaderComponent
];

const EXPORTS = [
  HeaderComponent,
  SidebarComponent,
  SubheaderComponent
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    ...NB_MODULES,
    ...NG_MODULES,
    ...APP_MODULES
  ],
  exports: [
    ...EXPORTS
  ]
})
export class ThemeModule { }
