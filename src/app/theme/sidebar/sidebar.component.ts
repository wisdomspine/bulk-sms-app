import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem } from '@nebular/theme';
import { menuItems } from "../../ui-features/menu-items";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  items: NbMenuItem[] = menuItems;

  constructor(
    public sidebarService: NbSidebarService
  ) { }

  ngOnInit() {
  }

}
