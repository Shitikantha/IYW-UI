import { Component, OnInit } from '@angular/core';
import { AddVisitorsService } from 'src/app/services/add-visitors.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared-module/components/modal/modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit {
  visitorsList: any = [];
  fromDatePiker: any;
  toDatePiker: any;
  constructor(
    private addVisitorsService: AddVisitorsService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allVisitorsList();
  }

  allVisitorsList() {
    this.addVisitorsService.getAllVisitors().subscribe((res: any) => {
      this.visitorsList = res.data;
    });
  }

  editVisitor(data: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });
    modalRef.componentInstance.AlertData = {
      data: '1',
      name: 'Edit Visitor',
      isFooter: false,
      Data: data,
    };
    modalRef.result.then((response) => {
      if (response) {
        this.allVisitorsList();
      }
    });
  }

  rejectVisitor(data: any) {
    let payload = {
      approvalStatus: 'Rejected',
      visitorId: data.visitorId,
      id: data.id,
    };
    this.addVisitorsService.approveVisitor(payload).subscribe({
      next: (result: any) => {
        this.alertService.showErrorToast({
          msg: 'Your Visit Request Rejected ....!',
        });
        this.allVisitorsList();
      },
      error: (err: any) => {
        this.alertService.showErrorToast({ msg: 'Something went wrong....!' });
      },
    });
  }

  approveVisitor(data: any) {
    let payload = {
      approvalStatus: 'Approved',
      visitorId: data.visitorId
    };
    this.addVisitorsService.approveVisitor(payload).subscribe({
      next: (result: any) => {
        this.alertService.showSuccessToast({
          msg: 'Your Visit Request Approved ....!',
        });
        this.allVisitorsList();
      },
      error: (err: any) => {
        this.alertService.showErrorToast({ msg: 'Something went wrong....!' });
      },
    });
  }

  checkOutVisitor(data:any){
    let payload = {
      visitorId: data.visitorId
    };
    this.addVisitorsService.checkOutVisitor(payload).subscribe({
      next: (result: any) => {
        this.alertService.showSuccessToast({
          msg: 'Your Visit Request Approved ....!',
        });
        this.allVisitorsList();
      },
      error: (err: any) => {
        this.alertService.showErrorToast({ msg: 'Something went wrong....!' });
      },
    });
  }

  goBack() {
    this.router.navigate(['/visitor']);
  }

  isCheckOut(data:any){
    return !data?.checkOutTime && data?.approvalStatus == 'Approved';
  }

  isEdit(data:any){
    return data?.approvalStatus != 'PendingApproved';
  }

  isApproved(data:any){
    // return data?.approvalStatus === 'Approved' ;
    return data?.approvalStatus != 'PendingApproved';
  }

  isRejected(data:any){
    return data?.approvalStatus != 'PendingApproved';;
    // return data?.approvalStatus === 'Rejected' || !!data?.checkOut;
  }

  resetFilter() {
    this.fromDatePiker = null;
    this.toDatePiker = null;
  }
}
