import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersComponent } from './page/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UserFormComponent],
  imports: [UsersRoutingModule, CommonModule, SharedModule],
  entryComponents: [UserFormComponent],
})
export class UsersModule {}
