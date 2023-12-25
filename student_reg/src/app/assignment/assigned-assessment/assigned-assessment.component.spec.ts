import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedAssessmentComponent } from './assigned-assessment.component';

describe('AssignedAssessmentComponent', () => {
  let component: AssignedAssessmentComponent;
  let fixture: ComponentFixture<AssignedAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedAssessmentComponent]
    });
    fixture = TestBed.createComponent(AssignedAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
