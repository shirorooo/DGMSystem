import { Component, OnInit } from '@angular/core';
import { ElevateAttendance } from '../../../core/models/interfaces/elevate-attendance';
import { ElevateAttendanceService } from '../../../apis/elevate-attendance/elevate-attendance.service';
import { IsoDateFormatterService } from '../../../core/models/services/iso-date-formatter/iso-date-formatter.service';

@Component({
  selector: 'app-elevate-attendance',
  templateUrl: './elevate-attendance.component.html',
  styleUrl: './elevate-attendance.component.css'
})
export class ElevateAttendanceComponent implements OnInit {
  displayColumns: string[] = [
    'id-no',
    'name',
    'gender',
    'age',
    'contact-no',
    'school',
    'dgroup-leader',
    'first-timer'
  ]

  attendanceList: ElevateAttendance[] = []

  constructor(
    private _elevateAttendanceService: ElevateAttendanceService,
    private _isoFormatter: IsoDateFormatterService
  ){}


  ngOnInit(): void {
    this.getAttendanceForToday()
  }

  private getAttendanceForToday(): void{
    this._elevateAttendanceService.getAttendanceByDate(this._isoFormatter.formatter()).subscribe(
      response => this.attendanceList = response,
      error => console.error('Error', error)
    )
  }

}
