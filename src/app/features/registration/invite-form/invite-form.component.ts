import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElevateAttendeeService } from '../../../apis/elevate-attendee/elevate-attendee.service';
import { ElevateAttendeeProfile } from '../../../core/models/interfaces/elevate-attendee-profile.interface';
import { ElevateAttendanceService } from '../../../apis/elevate-attendance/elevate-attendance.service';
import { ElevateAttendance } from '../../../core/models/interfaces/elevate-attendance';
import { AsyncValidatorService } from '../../../core/models/services/async-validator/async-validator.service';
import { IsoDateFormatterService } from '../../../core/models/services/iso-date-formatter/iso-date-formatter.service';
import { ElevateSchoolRecord } from '../../../core/models/interfaces/elevate-school-record.interface';
import { ElevateSchoolsService } from '../../../apis/elevate-schools/elevate-schools.service';
import { error } from 'console';

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrl: './invite-form.component.css'
})
export class InviteFormComponent implements OnInit{
  
  genders: string[] = ['Male','Female']
  schools: ElevateSchoolRecord[] = []
  phContactPrefix: string = '+63'
  form!: FormGroup;
  recordCreated: boolean = false
  recordExist: boolean = false

  constructor(
    private _elevateAttendeeService: ElevateAttendeeService,
    private _elevateAttendanceService: ElevateAttendanceService,
    private _elevateSchoolRecordService: ElevateSchoolsService,
    private _formBuilder: FormBuilder,
    private _asyncValidator: AsyncValidatorService,
    private _isoFormatter: IsoDateFormatterService,
  ){
  }


  ngOnInit(): void {

    // INITIALIZE THE REACTIVE FORM INITIAL STATE
    this.form = this._formBuilder.group({
      fName: ['', [Validators.required]],
      mName: ['', []],
      lName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      contact: [
        '', 
        [
          Validators.minLength(10), 
          Validators.pattern(/^-?(0|[1-9]\d*)?$/), 
          Validators.required
        ], 
        [this._asyncValidator.forbiddenNameValidator.bind(this._asyncValidator)]
      ],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      socMed: ['', []],
      address: ['', [Validators.required]],
      school: ['', []],
      dgroupLeader: ['', []]
    })

    this.fetchAllSchoolRecords()
  }

  /**
   * The onSubmit function creates an ElevateAttendeeProfile object using form data and adds it to the
   * attendee profiles.
   */
  public onSubmit(): void{
    const fieldsData = this.form.controls
    const middleName = fieldsData['mName'].value || ''
    const birthday = this._isoFormatter.formatter(fieldsData['birthday'].value)

    const attendeeData: ElevateAttendeeProfile = {
      id: 0,
      name: `${fieldsData['lName'].value}, ${fieldsData['fName'].value} ${middleName}`,
      gender: `${fieldsData['gender'].value}`,
      birthday: `${birthday}`,
      age: fieldsData['age'].value,
      contactNo: `${this.phContactPrefix}${fieldsData['contact'].value}`,
      address: `${fieldsData['address'].value}`,
      email: `${fieldsData['email'].value}`,
      fbName: `${fieldsData['socMed'].value}` || '',
      school: `${fieldsData['school'].value}` || '',
      dgroupLeader: `${fieldsData['dgroupLeader'].value}` || ''
    }

    this.addAttendeeProfile(attendeeData)
  }

  /**
   * The function `addAttendeeProfile` adds an attendee profile using ElevateAttendeeService and logs
   * the response or error.
   * @param {ElevateAttendeeProfile} attendeeProfile - The `addAttendeeProfile` function takes an
   * `attendeeProfile` parameter of type `ElevateAttendeeProfile`. This parameter likely contains
   * information about an attendee, such as their name, contact details, and any other relevant
   * information. The function then calls the `addAttendeeProfile`
   */
  public addAttendeeProfile(attendeeProfile: ElevateAttendeeProfile): void{
    this._elevateAttendeeService.addAttendeeProfile(attendeeProfile).subscribe(
      response => {
        this.addAttendanceRecord(response)
        this.recordCreated = true
        console.log('Attendee Response', response)
      },
      error => {
        if(error.status == 409) this.addAttendanceRecord(attendeeProfile, 409)
          this.recordExist = true
        console.error('Error', error.status)
      },
      () => {
        this.resetForm()
        setInterval(() => {
          this.recordCreated = false
          this.recordExist = false
        }, 5000)
      }
    )
  }

  /**
   * The function `addAttendanceRecord` adds a new attendance record for a given name with the current
   * date.
   * @param {string} name - The `addAttendanceRecord` function takes a `name` parameter, which is a
   * string representing the name of the person whose attendance record is being added.
   */
  public addAttendanceRecord(attendee: ElevateAttendeeProfile, errorCode?: number): void{
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
      firstTimer: errorCode == 409 ? "No" : "Yes"
    }

    this._elevateAttendanceService.addAttendanceRecord(elevateAttendance).subscribe(
      response => console.log('Attendance response', response),
      error => console.error('Attendance Error', error)
    )
  }

  /**
   * The function fetches all school records using a service and assigns the data to a variable while
   * handling any errors.
   */
  private fetchAllSchoolRecords(): void{
    this._elevateSchoolRecordService.fetchAllSchoolRecords().subscribe(
      data => this.schools = data,
      error => console.error('Error', error)
    )
  }

  /**
   * The `resetForm` function resets the form by calling the `reset` method on the form control.
   */
  private resetForm(): void{
    this.form.reset()
  }
}
