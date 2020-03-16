import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { subMenuItems } from 'src/app/ui-features/menu-items';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  
  items: NbMenuItem[] = subMenuItems;
  
  constructor() { }

  ngOnInit() {
    console.log(this.items);
  }

}
