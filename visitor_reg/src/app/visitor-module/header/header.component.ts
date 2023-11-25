import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddVisitorsService } from 'src/app/services/add-visitors.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:any;
  headerInfo:any = [];
  constructor(private router: Router,
    private addVisitorsService:AddVisitorsService) { }

  ngOnInit(): void {
    let user:any = sessionStorage.getItem("userName");
    const result = user.split(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    this.userName = result[0]
    this.getHeaderInfo();
  }
  getHeaderInfo(){
    this.addVisitorsService.getHeaderInfo().subscribe((res:any)=>{
      this.headerInfo = res;
    })
  }
logout(){
  sessionStorage.clear();
  this.router.navigate(['/']);
}
}
