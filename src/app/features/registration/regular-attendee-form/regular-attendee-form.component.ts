import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ElevateAttendeeService } from '../../../apis/elevate-attendee.service';
import { ElevateAttendeeProfile } from '../../../core/models/interfaces/elevate-attendee-profile.interface';

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

  constructor(
    private _elevateAttendeeService: ElevateAttendeeService,
    private _formBuilder: FormBuilder,
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
    console.log(attendeeName)
  }
}
