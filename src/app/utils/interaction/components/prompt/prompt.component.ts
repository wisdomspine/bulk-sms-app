import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl } from '@angular/forms';

export interface PromptContext {
  status?: "basic" | "primary" | "info" | "success" | "warning" | "danger" | "control" ;
  icon?: string ;
  question?: string ;
  submitLabel?: string ;
  cancelLabel?: string ;
  accent?: "basic" | "primary" | "info" | "success" | "warning" | "danger" | "control" ;
  size?: "tiny" | "small" | "medium" | "large" | "giant" ;
  default?: string
}

export const defaultPromptContext: PromptContext = {
  status : "basic",
  icon : "question-mark-outline",
  question : "prompt",
  cancelLabel : "cancel",
  submitLabel : "submit",
  accent : "basic",
  size :"medium",
  default: null
}

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
    // @Input() title: string;
    @Input() status: string ="basic";
    @Input() icon: string = "question-mark-outline";
    @Input() question: string = "confirm";
    @Input() accent = "basic";
    @Input() submitLabel = "submit";
    @Input() cancelLabel = "cancel";
    @Input() size = "medium";
    @Input() default = null;
    control: FormControl ;

  constructor(
    protected ref: NbDialogRef<PromptComponent>
  ) { }

  ngOnInit() {
    this.control = new FormControl(this.default);
  }

  close(value: string = null){
    this.ref.close(value);
  }  

}
