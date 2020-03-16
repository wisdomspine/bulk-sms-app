import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NbLayoutModule, NbSidebarModule, NbThemeModule } from "@nebular/theme";
import { ThemeModule } from './theme';
import { AppRoutingModule } from './app-routing.module';
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { CommonModule } from '@angular/common';
import { SettingModule } from './setting/setting.module';
import { ContactModule } from './contact/contact.module';
import { UtilsModule } from './utils/utils.module';

const NB_IMPORTS = [
  NbThemeModule.forRoot({
    name: "dark"
  }),
  NbLayoutModule,
  NbSidebarModule.forRoot(),
  ThemeModule,
  NbEvaIconsModule
]

const NG_IMPORTS = [
  BrowserModule,
  CommonModule
]

const APP_IMPORTS = [
  SettingModule,
  ContactModule,
  AppRoutingModule,
  UtilsModule
]

const DECLARATIONS = [
  AppComponent
];

const PROVIDERS = [

];

const EXPORTS = [

];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    ...NG_IMPORTS,
    ...NB_IMPORTS,
    ...APP_IMPORTS
  ],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
  exports: [...EXPORTS]
})
export class AppModule { }
