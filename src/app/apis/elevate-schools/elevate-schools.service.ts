import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElevateSchoolRecord } from '../../core/models/interfaces/elevate-school-record.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElevateSchoolsService {

  constructor(
    private _http: HttpClient
  ) { }

  // GET ALL SCHOOL RECORDS
  fetchAllSchoolRecords(): Observable<ElevateSchoolRecord[]>{
    return this._http.get<ElevateSchoolRecord[]>(`${environment.apiUrl}${environment.schoolEndpoint}`)
  }

  // GET SCHOOL RECORD BY ID
  fetchSchoolRecordById(id: number): Observable<ElevateSchoolRecord>{
    return this._http.get<ElevateSchoolRecord>(`${environment.apiUrl}${environment.schoolEndpoint}/${id}`)
  }

  // CREATE SCHOOL RECORD
  createSchoolRecord(record: ElevateSchoolRecord): Observable<ElevateSchoolRecord>{
    return this._http.post<ElevateSchoolRecord>(`${environment.apiUrl}${environment.schoolEndpoint}`, record)
  }

  // UPDATE SCHOOL RECORD
  updateSchoolRecord(record: ElevateSchoolRecord): Observable<ElevateSchoolRecord>{
    return this._http.put<ElevateSchoolRecord>(`${environment.apiUrl}${environment.schoolEndpoint}`, record)
  }

  // DELETE SCHOOL RECORD
  deleteSchoolRecord(id: number): Observable<string>{
    return this._http.delete<string>(`${environment.apiUrl}${environment.schoolEndpoint}/${id}`)
  }
}
