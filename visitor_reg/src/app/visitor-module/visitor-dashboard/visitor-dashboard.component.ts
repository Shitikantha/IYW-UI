import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-dashboard',
  templateUrl: './visitor-dashboard.component.html',
  styleUrls: ['./visitor-dashboard.component.css']
})
export class VisitorDashboardComponent implements OnInit {
 
  constructor(private router: Router) {
    
  }
ngOnInit(): void {
  
}
goToaddVisitor(){
  this.router.navigate(['/visitor/add']);
}
goToaddVisitorList(){
  this.router.navigate(['/visitor/visitor-list']);
}

}
