import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbardComponent } from './dashbard.component';

describe('DashbardComponent', () => {
  let component: DashbardComponent;
  let fixture: ComponentFixture<DashbardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbardComponent]
    });
    fixture = TestBed.createComponent(DashbardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
