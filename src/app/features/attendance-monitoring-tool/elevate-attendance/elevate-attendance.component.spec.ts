import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevateAttendanceComponent } from './elevate-attendance.component';

describe('ElevateAttendanceComponent', () => {
  let component: ElevateAttendanceComponent;
  let fixture: ComponentFixture<ElevateAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElevateAttendanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElevateAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
