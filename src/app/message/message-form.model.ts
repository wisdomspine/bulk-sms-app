import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Message } from './message.model';
export class MessageFormModel extends FormGroup {
    constructor(message: Message) {
        super({
            body: new FormControl(message.body ||"", [
                Validators.required
            ]),
            from: new FormControl(message.from, [
                Validators.minLength(3),
                Validators.maxLength(11)
            ]),
        })
    }
}