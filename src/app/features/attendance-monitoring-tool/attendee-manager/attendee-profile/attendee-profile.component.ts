import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElevateAttendeeService } from '../../../../apis/elevate-attendee/elevate-attendee.service';
import { Subscription } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-attendee-profile',
  templateUrl: './attendee-profile.component.html',
  styleUrl: './attendee-profile.component.css'
})
export class AttendeeProfileComponent implements OnInit {

  nameParam: string = ""

  _paramSubscription!: Subscription
  _profileSubscription!: Subscription

  constructor(
    private _route: ActivatedRoute,
    private _elevateAttendeeService: ElevateAttendeeService
  ){}

  ngOnInit(): void {
    this.getIdFromUrlParam()
    this.fetchAttendeeProfile()
  }

  ngOnDestroy(){
    if(this._paramSubscription != undefined) this._paramSubscription.unsubscribe();
    if(this._profileSubscription != undefined) this._profileSubscription.unsubscribe();
  }

  private getIdFromUrlParam(): void{
    this._paramSubscription = this._route.params.subscribe(
      params => {
        this.nameParam = params['name']
      }
    )
  }

  private fetchAttendeeProfile(): void{
    this._profileSubscription = this._elevateAttendeeService.getAttendeeRecordByName(this.nameParam).subscribe(
      data => console.log(data),
      error => console.log('Error', error)
    )
  }
}
