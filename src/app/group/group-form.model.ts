import { Group } from './group.model';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Constant } from '../constant';

export class GroupFormModel extends FormGroup{
    group: Group;
    uploading: boolean = false;
    constructor(group: Group){
        super({
            name: new FormControl(
                group.name || undefined,
                [
                    Validators.required,
                    Validators.minLength(Constant.MIN_GROUP_NAME),
                    Validators.maxLength(Constant.MAX_GROUP_NAME)
                ]
            ),
            description: new FormControl(
                group.description || undefined,
            ),
        })
        this.group = group? group : new Group();
    }
}