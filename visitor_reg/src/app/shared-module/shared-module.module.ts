import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateVisitorProfileComponent } from '../visitor-module/update-visitor-profile/update-visitor-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { WebcamModule } from 'ngx-webcam';
import { WebCamComponent } from '../visitor-module/web-cam/web-cam.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewVisitorComponent } from './components/view-visitor/view-visitor.component';


@NgModule({
  declarations: [
    ModalComponent,
    UpdateVisitorProfileComponent,
    WebCamComponent,
    ViewVisitorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    WebcamModule,
    NgbDatepickerModule,
  ],
  exports:[
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalComponent,
    WebcamModule,
    NgbDatepickerModule
  ]
  
})
export class SharedModuleModule { }
