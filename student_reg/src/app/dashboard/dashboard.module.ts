import { NgModule } from '@angular/core';
import { DashbardComponent } from './dashbard/dashbard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';



@NgModule({
  declarations: [
    DashbardComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModuleModule
  ]
})
export class DashboardModule { }
