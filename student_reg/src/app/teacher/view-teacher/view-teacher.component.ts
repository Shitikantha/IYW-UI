import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css']
})
export class ViewTeacherComponent {
  @Input() viewData:any;
}
