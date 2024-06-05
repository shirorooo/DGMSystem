import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElevateAttendance } from '../../core/models/interfaces/elevate-attendance';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElevateAttendanceService {

  constructor(
    private _http:HttpClient
  ) { }

  getAttendanceByDate(date: string): Observable<ElevateAttendance[]>{
    return this._http.get<ElevateAttendance[]>(`${environment.apiUrl}${environment.attendanceEndpoint}/${date}`)
  }

  addAttendanceRecord(attendance: ElevateAttendance): Observable<ElevateAttendance>{
    return this._http.post<ElevateAttendance>(`${environment.apiUrl}${environment.attendanceEndpoint}`, attendance)
  }
}
