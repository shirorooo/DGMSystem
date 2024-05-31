import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { HomeComponent } from './features/home/home.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { AttendanceMonitoringToolComponent } from './features/attendance-monitoring-tool/attendance-monitoring-tool.component';
import { NoPageFoundComponent } from './features/no-page-found/no-page-found.component';
import { InviteFormComponent } from './features/registration/invite-form/invite-form.component';
import { RegularAttendeeFormComponent } from './features/registration/regular-attendee-form/regular-attendee-form.component';
import { ElevateAttendanceComponent } from './features/attendance-monitoring-tool/elevate-attendance/elevate-attendance.component';
import { AttendeeManagerComponent } from './features/attendance-monitoring-tool/attendee-manager/attendee-manager.component';
import {provideNativeDateAdapter} from '@angular/material/core';


//ANGULAR MATERIAL
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegistrationComponent,
    AttendanceMonitoringToolComponent,
    NoPageFoundComponent,
    InviteFormComponent,
    RegularAttendeeFormComponent,
    ElevateAttendanceComponent,
    AttendeeManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    HttpClientModule,

    //ANGULAR MATERIAL
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule
  ],
  providers: [
    provideClientHydration(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
