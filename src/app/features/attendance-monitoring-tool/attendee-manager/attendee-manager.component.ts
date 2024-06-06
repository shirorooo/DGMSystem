import { Component, OnInit } from '@angular/core';
import { ElevateAttendeeService } from '../../../apis/elevate-attendee/elevate-attendee.service';
import { ElevateAttendeeProfile } from '../../../core/models/interfaces/elevate-attendee-profile.interface';
import { Router } from '@angular/router';

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
    'dgroup-leader',
    'profile'
  ]
  attendeeList: ElevateAttendeeProfile[] = []

  constructor(
    private _elevateAttendeeService: ElevateAttendeeService,
    private _router: Router
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

  public openProfile(name: string): void{
    this._router.navigate(['profile', name])
  }

}
