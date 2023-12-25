import { NgModule } from '@angular/core';
import { DashbardComponent } from './dashbard/dashbard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DashbardComponent
  ],
  imports: [
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
