import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElevateAttendeeProfile } from '../core/models/interfaces/elevate-attendee-profile.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElevateAttendeeService {

  constructor(
    private _http: HttpClient,
  ) { }

  // GET ALL THE LIST OF THE RECORDED ATTENDEES
  getAttendeesList(): Observable<ElevateAttendeeProfile[]>{
    return this._http.get<ElevateAttendeeProfile[]>(`${environment.apiUrl}${environment.attendeeEndpoint}`)
  }

  // GET ATTENDEE RECORD USING ID
  getAttendeeRecordById(id: number): Observable<ElevateAttendeeProfile>{
    return this._http.get<ElevateAttendeeProfile>(`${environment.apiUrl}${environment.attendeeEndpoint}/${id}`)
  }

  // ADD PERSON PROFILE
  addAttendeeProfile(profile: ElevateAttendeeProfile): Observable<ElevateAttendeeProfile>{
    return this._http.post<ElevateAttendeeProfile>(`${environment.apiUrl}${environment.attendeeEndpoint}`, profile)
  }

  // UPDATE PERSON DATA
  updateAttendeeProfile(profile: ElevateAttendeeProfile): Observable<ElevateAttendeeProfile>{
    return this._http.put<ElevateAttendeeProfile>(`${environment.apiUrl}${environment.attendeeEndpoint}/${profile.id}`, profile)
  }

  // DELETE PERSON DATA
  deleteAttendeeProfile(profile: ElevateAttendeeProfile): Observable<ElevateAttendeeProfile>{
    return this._http.delete<ElevateAttendeeProfile>(`${environment.apiUrl}${environment.attendeeEndpoint}/${profile.id}`)
  }
}
