import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_PATHS } from '../paths';
import { GroupComponent } from './group/group.component';
import { NewGroupComponent } from './new-group/new-group.component';


const routes: Routes = [
  {
    path: APP_PATHS.groups,
    component: GroupComponent
  },
  {
    path: APP_PATHS.newGroup,
    component: NewGroupComponent
  },
  {
    path: APP_PATHS.newGroup+"/:id",
    component: NewGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
