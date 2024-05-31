import { Component, OnInit } from '@angular/core';
import { ElevateAttendeeService } from '../../../apis/elevate-attendee.service';
import { ElevateAttendeeProfile } from '../../../core/models/interfaces/elevate-attendee-profile.interface';

@Component({
  selector: 'app-attendee-manager',
  templateUrl: './attendee-manager.component.html',
  styleUrl: './attendee-manager.component.css'
})
export class AttendeeManagerComponent{
  displayColumns: string[] = [
    'id-no',
    'name',
    'gender',
    'birthday',
    'age',
    'contact-no',
    'address',
    'email',
    'school',
    'dgroup-leader'
  ]
  attendeeList: ElevateAttendeeProfile[] = []

  constructor(
    private _elevateAttendeeService: ElevateAttendeeService
  ){}

  ngOnInit(): void {
    this.getAttendeeLIst()
  }

  private getAttendeeLIst(): void{
    this._elevateAttendeeService.getAttendeesList().subscribe(
      data => this.attendeeList = data,
      error => console.error('Error', error)
    )
  }

}
