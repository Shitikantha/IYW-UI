import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddVisitorComponent } from './add-visitor/add-visitor.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { VisitorDashboardComponent } from './visitor-dashboard/visitor-dashboard.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { SearchPipe } from './visitor-list/search.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AddVisitorComponent,
    VisitorListComponent,
    VisitorDashboardComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
  ]
})
export class VisitorModuleModule { }
