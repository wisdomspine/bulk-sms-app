import { Component } from '@angular/core';
import { Constant } from './constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = Constant.TITLE;
}
