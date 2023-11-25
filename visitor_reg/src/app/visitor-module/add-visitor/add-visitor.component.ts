import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddVisitorsService } from 'src/app/services/add-visitors.service';
import { AlertService } from 'src/app/services/alert.service';
import { ModalComponent } from 'src/app/shared-module/components/modal/modal.component';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.css']
})
export class AddVisitorComponent implements OnInit {
  submitted:boolean=false;
  registrationForm:FormGroup;
  aptMembers:any = [];
  public webcamImage: any = null;
  idType:any = [{'typeId':1,"name":'Aadhaar card'},{'typeId':2,"name":'Pan card'},{'typeId':3,"name":'Voter card'}];

  constructor(private fb:FormBuilder,
    private visitorService:AddVisitorsService,
    private alertService:AlertService,
    private router: Router,
    private modalService : NgbModal,
    ) {
    this.registrationForm = this.fb.group({
      // visitorId:["",Validators.required],
      visitorName:["",Validators.required],
      purpose:["",Validators.required],
      contactNo:["",Validators.required],
      contactPerson:["",Validators.required],
      noOfPerson:["",Validators.required],
      comments:[''],
      idType:['Aadhaar card',Validators.required],
      idValue:['',Validators.required]
    })
  }

  get f(){
    return this.registrationForm['controls'];
  }


  onSubmit(){
    this.submitted = true;
    if(this.registrationForm.valid){
      let payload = {
        // visitorId:this.registrationForm.controls['visitorId'].value,
        visitorName:this.registrationForm.controls['visitorName'].value,
        purpose:this.registrationForm.controls['purpose'].value,
        contactNo:this.registrationForm.controls['contactNo'].value,
        contactPerson:this.registrationForm.controls['contactPerson'].value,
        noOfPerson:this.registrationForm.controls['noOfPerson'].value,
        idType:this.registrationForm.controls['idType'].value,
        idValue:this.registrationForm.controls['idValue'].value,
        updateStatus:null,
        checkIn: new Date().toLocaleDateString(),
        checkOut:null,
        // webCamImg:this.webcamImage.imageAsDataUrl
      }
      this.visitorDetails(payload);
    }
  }

  ngOnInit(): void {
    this.getAllAptMember();
  }
  visitorDetails(payload:any){
    this.visitorService.addVisitors(payload).subscribe({
      next: (result: any) => {
        this.alertService.showSuccessToast({msg:'New visitor added successfully....!'});
        this.router.navigate(['/visitor']);
        },
        error: (err: any) => {
          this.alertService.showErrorToast({msg:'Something went wrong....!'});
        },
     });
  }
  goBack(){
    this.router.navigate(['/visitor']);
  }

  getAllAptMember(){
    this.visitorService.getAptMembers().subscribe({
      next: (result: any) => {
        this.aptMembers = result.data;
        }
    });
  }

  captureImage(){
    const modalRef = this.modalService.open(ModalComponent, {backdrop: 'static', keyboard: false ,size:'lg'});
    modalRef.componentInstance.AlertData = {
      data: '2',
      name: 'Capture Image',
      isFooter:false,
    };
    modalRef.result.then((response) => {
      if (response) {
        this.webcamImage = response;
      }
    })
  }

  
}
