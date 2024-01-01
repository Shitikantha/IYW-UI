import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ModalComponent,
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbDatepickerModule,
    DragDropModule,
  ],
  exports:[
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalComponent,
    NgbDatepickerModule,
    HeaderComponent,
    FooterComponent,
    DataTableComponent,
    DragDropModule,
  ]
  
})
export class SharedModuleModule { }
