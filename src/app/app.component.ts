import { Component } from '@angular/core';
import { Constant } from './constant';
import { InteractionService } from './utils/interaction/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = Constant.TITLE;

  constructor(
    public interactionService: InteractionService
  ){

  }

}
