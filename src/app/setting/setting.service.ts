import { Injectable } from '@angular/core';
import { Constant } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public appName: string = Constant.TITLE;
  constructor() { }
}
