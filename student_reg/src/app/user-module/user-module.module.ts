import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    SharedModuleModule,
    UserRoutingModule
  ]
})
export class UserModuleModule { }
