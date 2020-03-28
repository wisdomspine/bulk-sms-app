import { Component, OnInit } from '@angular/core';
import { NbThemeService, NbSidebarService } from '@nebular/theme';
import { map, takeUntil, tap } from "rxjs/operators";
import { Subject } from 'rxjs';
import { SettingService } from 'src/app/setting/setting.service';
import { Constant } from 'src/app/constant';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = Constant.DEFAULT_THEME+"";

  constructor(
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private settingService: SettingService,
    private window: Window
  ) { }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
    
      this.changeTheme(this.window.localStorage.getItem("theme") || this.currentTheme);
  }

  changeTheme(themeName: string) {
    //set the storage 
    this.themeService.changeTheme(themeName);
    this.window.localStorage.setItem("theme", themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }  

}
