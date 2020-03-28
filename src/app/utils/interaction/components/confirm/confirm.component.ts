import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

export interface ConfirmContext {
  status?: "basic" | "primary" | "info" | "success" | "warning" | "danger" | "control" ;
  icon?: string ;
  message?: string ;
  rejectLabel?: string ;
  acceptLabel?: string ;
  accent?: "basic" | "primary" | "info" | "success" | "warning" | "danger" | "control" ;
  size?: "tiny" | "small" | "medium" | "large" | "giant" ;
}

export const defaultConfirmContext: ConfirmContext = {
  status : "basic",
  icon : "alert-circle-outline",
  message : "confirm",
  rejectLabel : "no",
  acceptLabel : "yes",
  accent : "basic",
  size :"medium"
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})

export class ConfirmComponent implements OnInit {

  // @Input() title: string;
  @Input() status: string ="basic";
  @Input() icon: string = "alert-circle-outline";
  @Input() message: string = "confirm";
  @Input() rejectLabel = "no";
  @Input() acceptLabel = "yes";
  @Input() accent = "basic";
  @Input() size = "medium";

  constructor(
    protected ref: NbDialogRef<ConfirmComponent>
  ) { }

  ngOnInit() {
  }

  close(option: boolean = false){
    this.ref.close(option)
  }

}
