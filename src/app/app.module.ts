import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NbLayoutModule, NbSidebarModule, NbThemeModule } from "@nebular/theme";
import { ThemeModule } from './theme';
import { AppRoutingModule } from './app-routing.module';
import { NbEvaIconsModule } from "@nebular/eva-icons";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({
      name: "dark"
    }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    ThemeModule,
    AppRoutingModule,
    NbEvaIconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
