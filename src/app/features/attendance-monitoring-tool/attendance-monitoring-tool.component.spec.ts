import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMonitoringToolComponent } from './attendance-monitoring-tool.component';

describe('AttendanceMonitoringToolComponent', () => {
  let component: AttendanceMonitoringToolComponent;
  let fixture: ComponentFixture<AttendanceMonitoringToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceMonitoringToolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceMonitoringToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
