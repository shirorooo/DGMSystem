import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ElevateAttendeeService } from '../../../apis/elevate-attendee.service';
import { ElevateAttendeeProfile } from '../../../core/models/interfaces/elevate-attendee-profile.interface';

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrl: './invite-form.component.css'
})
export class InviteFormComponent {
  
  genders: string[] = ['Male','Female']
  phContactPrefix: string = '+63'
  form: FormGroup

  constructor(
    private _elevateAttendeeService: ElevateAttendeeService,
    private _formBuilder: FormBuilder,
  ){
    this.form = this._formBuilder.group({
      fName: ['', [Validators.required]],
      mName: ['', []],
      lName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      contact: ['', [Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.email]],
      socMed: ['', []],
      address: ['', []],
      school: ['', []]
    })
  }

  /**
   * The onSubmit function creates an ElevateAttendeeProfile object using form data and adds it to the
   * attendee profiles.
   */
  public onSubmit(): void{
    const fieldsData = this.form.controls
    const attendeeData: ElevateAttendeeProfile = {
      id: 0,
      name: `${fieldsData['lName'].value}, ${fieldsData['fName'].value} ${fieldsData['mName'].value}`,
      gender: `${fieldsData['gender'].value}`,
      birthday: `${fieldsData['birthday'].value}`,
      age: fieldsData['age'].value,
      contactNo: `${this.phContactPrefix}${fieldsData['contact'].value}`,
      address: `${fieldsData['address'].value}`,
      email: `${fieldsData['email'].value}`,
      fbName: `${fieldsData['socMed'].value}`,
      school: `${fieldsData['school'].value}`,
      dgroupLeader: ""
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
  public addAttendeeProfile(attendeeProfile: ElevateAttendeeProfile){
    this._elevateAttendeeService.addAttendeeProfile(attendeeProfile).subscribe(
      response => console.log(response),
      error => console.error('Error', error)
    ).unsubscribe()
  }
}
