import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl } from '@angular/forms';

export interface NotifyContext {
  status?: "basic" | "primary" | "info" | "success" | "warning" | "danger" | "control" ;
  icon?: string ;
  // title?: string ;
  body?: string;
  dismissLabel?: string ;
  accent?: "basic" | "primary" | "info" | "success" | "warning" | "danger" | "control" ;
  size?: "tiny" | "small" | "medium" | "large" | "giant" ;
}

export const defaultNotifyContext: NotifyContext = {
  status : "basic",
  icon : "alert-circle-outline",
  // title : "Notification",
  body : "",
  dismissLabel : "ok",
  accent : "basic",
  size :"medium",
}

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

    @Input() body: string;
    @Input() status: string ="basic";
    @Input() icon: string = "alert-circle-outline";
    @Input() accent = "basic";
    @Input() dismissLabel = "ok";
    @Input() size = "medium";

  constructor(
    protected ref: NbDialogRef<NotifyComponent>
  ) { }

  ngOnInit() {
  }

  close(){
    this.ref.close();
  }  

}
