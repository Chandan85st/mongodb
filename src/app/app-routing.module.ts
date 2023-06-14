import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUserComponent } from './add-user/add-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserDetailComponent } from './all-users/user-detail/user-detail.component';

const routes: Routes = [
  {path:'', component:AllUsersComponent},
  {path:'users', component:AllUsersComponent},
  {path:'add-user', component:AddUserComponent},
  {path:'edit-user/:id', component:AddUserComponent},
  {path:'users/:id', component:UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
