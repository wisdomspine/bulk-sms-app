import { Injectable } from '@angular/core';
import { Constant } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public appName: string = Constant.TITLE;
  public maxFileSize: number = 1024*1000*5; //max of 5mb file
  constructor() { }
}
