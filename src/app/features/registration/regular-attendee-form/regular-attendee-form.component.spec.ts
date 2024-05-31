import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularAttendeeFormComponent } from './regular-attendee-form.component';

describe('RegularAttendeeFormComponent', () => {
  let component: RegularAttendeeFormComponent;
  let fixture: ComponentFixture<RegularAttendeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegularAttendeeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegularAttendeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
