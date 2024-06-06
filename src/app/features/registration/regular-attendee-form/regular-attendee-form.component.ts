import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ElevateAttendeeService } from '../../../apis/elevate-attendee/elevate-attendee.service';
import { ElevateAttendeeProfile } from '../../../core/models/interfaces/elevate-attendee-profile.interface';
import { IsoDateFormatterService } from '../../../core/models/services/iso-date-formatter/iso-date-formatter.service';
import { ElevateAttendance } from '../../../core/models/interfaces/elevate-attendance';
import { ElevateAttendanceService } from '../../../apis/elevate-attendance/elevate-attendance.service';

@Component({
  selector: 'app-regular-attendee-form',
  templateUrl: './regular-attendee-form.component.html',
  styleUrl: './regular-attendee-form.component.css'
})
export class RegularAttendeeFormComponent {

  names: string[] = [];
  filteredNames: string[] = []
  attendeesList: ElevateAttendeeProfile[] = []
  form: FormGroup
  noRecordsFound: boolean = false

  constructor(
    private _elevateAttendeeService: ElevateAttendeeService,
    private _elevateAttendanceService: ElevateAttendanceService,
    private _formBuilder: FormBuilder,
    private _isoFormatter: IsoDateFormatterService
  ){
    this.form = this._formBuilder.group({
      attendee: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.getAttendeeList()
  }

  public getAttendeeList(): void{
    this._elevateAttendeeService.getAttendeesList().subscribe(
      (response: ElevateAttendeeProfile[]) => {
        this.attendeesList = response
        const names = response.map(attendees => attendees.name)
        this.names = names
        this.filteredNames = names
      },
      error => console.error('Error', error)
    )
  }

  /**
   * The function filters options based on a case-insensitive input value from a text area element.
   * @param {Event} event - The `event` parameter in the `onInputChange` function represents the event
   * that is triggered when the input value in a text area element changes. In this case, the function
   * is specifically looking for changes in a text area element.
   */
  public onInputChange(event: Event) {
    const target = event.target as HTMLTextAreaElement
    const inputValue = target.value.toLowerCase();
    this.filteredNames = this.names.filter(option => option.toLowerCase().includes(inputValue));
  }

  //TODO: SEARCH FROM DATABASE
  public onSubmit(): void{
    const attendeeName = this.form.controls['attendee'].value
    this._elevateAttendeeService.getAttendeeRecordByName(attendeeName).subscribe(
      data => this.addAttendanceRecord(data),
      error => {
        if(error.status == 404) this.noRecordsFound = true
        console.error('Error', error)
      }
    )
  }

  public addAttendanceRecord(attendee: ElevateAttendeeProfile): void{
    const isoFormat = this._isoFormatter.formatter()

    const elevateAttendance: ElevateAttendance = {
      id: 0,
      name: attendee.name,
      attendanceDate: isoFormat,
      gender: attendee.gender,
      age: attendee.age,
      contactNo: attendee.contactNo,
      school: attendee.school,
      dgroupLeader: attendee.dgroupLeader,
      firstTimer: "No"
    }

    this._elevateAttendanceService.addAttendanceRecord(elevateAttendance).subscribe(
      response => console.log('Attendance response', response),
      error => console.error('Attendance Error', error)
    )
  }
}
