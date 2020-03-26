import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NbLayoutModule, NbSidebarModule, NbThemeModule, NbDialogModule, NbToastrModule, NbMenuModule } from "@nebular/theme";
import { ThemeModule } from './theme';
import { AppRoutingModule } from './app-routing.module';
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { CommonModule, registerLocaleData } from '@angular/common';
import { SettingModule } from './setting/setting.module';
import { ContactModule } from './contact/contact.module';
import { UtilsModule } from './utils/utils.module';
import { DirectivesModule } from './directives/directives.module';
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupModule } from './group/group.module';
import { SmsModule } from './sms/sms.module';
import { MessageModule } from './message/message.module';
import localeNg from "@angular/common/locales/en-NG";
import localeNgExtra from "@angular/common/locales/extra/en-NG";

registerLocaleData(localeNg, 'en-NG', localeNgExtra)

const NB_IMPORTS = [
  NbThemeModule.forRoot({
    name: "dark"
  }),
  NbLayoutModule,
  NbSidebarModule.forRoot(),
  ThemeModule,
  NbEvaIconsModule,
  NbDialogModule.forRoot(),
  NbToastrModule.forRoot(),
  NbMenuModule.forRoot()
]

const NG_IMPORTS = [
  BrowserModule,
  CommonModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  BrowserAnimationsModule,
]

const APP_IMPORTS = [
  SettingModule,
  ContactModule,
  AppRoutingModule,
  UtilsModule,
  DirectivesModule,
  GroupModule,
  SmsModule.forRoot(environment.nexmoConfig), //configure the sms module
  MessageModule
]

const DECLARATIONS = [
  AppComponent
];

const PROVIDERS = [

];

const EXPORTS = [
  DirectivesModule
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    ...NG_IMPORTS,
    ...NB_IMPORTS,
    ...APP_IMPORTS,
  ],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
  exports: [...EXPORTS]
})
export class AppModule { }
//
