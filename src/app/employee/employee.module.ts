import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { EmployeeRoutingModule } from '../employee/employee-routing.module'
import { ProjectComponent } from './project/project.component';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component'; 
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from '../services/employee.service'; 



@NgModule({
  declarations: [
    ProjectComponent, PersonalDetailComponent,
    //EmployeeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
   // EmployeeRoutingModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() ,
  ],
  providers: [
    EmployeeService, 
    HttpClientModule
   ]
})
export class EmployeeModule { }
