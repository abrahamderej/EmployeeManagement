 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { Routes, RouterModule } from '@angular/router';
import { SidebarModule} from 'ng-sidebar';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeService } from './services/employee.service';
import { EmployeeRoutingModule } from './employee/employee-routing.module';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SidebarModule.forRoot(),
    ReactiveFormsModule ,
    AgGridModule.withComponents([]),
   // BsDatepickerModule.forRoot(),
    //DatepickerModule.forRoot() ,
    EmployeeModule
  ],
  providers: [ 
    HttpClientModule ,EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }