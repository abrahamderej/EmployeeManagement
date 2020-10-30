import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ColDef, GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee';


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  employeeIdUpdate = null;
  dataSaved = false;
  massage = null;
  selectedRows: any;
  public employees: Employee[];


  public columnDefs: ColDef[];   // row data and column definitions
  // gridApi and columnApi  
  private gridApi: GridApi;
  private columnApi: ColumnApi;
  public employeeId: any;
  gridOptions: GridOptions; //Declare gridoptions

  submitted: boolean = false;
  employeeForm: any; // form name
  Title: any = ['ATO', 'WRO', 'W/T'];
  Gender: any = ['Male', 'Female'];
  Nationality: any = ['Ethiopia', 'Kenya', 'Sudan', 'South Sudan', 'Djibuti'];

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService, private toastr: ToastrService) {
    this.columnDefs = this.createColumnDefs();
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue'
      });

    this.gridOptions = {
      // onRowDoubleClicked(): this.onRowDoubleClicked(any)

    }
  }

  ngOnInit() {

    this.getEmployeeList();
  }

  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space  
  onGridReady(params): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  // create column definitions  
  private createColumnDefs() {
    return [{
      headerName: 'Code',
      field: 'Code',
      filter: false,
      editable: false,
      sortable: false
    }, {
      headerName: 'Title',
      field: 'Title',
      filter: false,
      editable: false,
      sortable: false
    }, {
      headerName: 'First Name',
      field: 'FirstName',
      filter: true,
      editable: false,
      sortable: true
    }, {
      headerName: 'Middle Name',
      field: 'MiddleName',
      filter: true,
      editable: false,
      sortable: true
    }, {
      headerName: 'Last Name',
      field: 'LastName',
      filter: true,
      editable: false,
      sortable: true
    },
    {
      headerName: 'Gender',
      field: 'Gender',
      filter: false,
      sortable: false,
      editable: false,
    }, {
      headerName: 'Nationality',
      field: 'Nationality',
      filter: true,
      editable: false,
      sortable: true
    }, {
      headerName: 'Date of Birth',
      field: 'BirthDate',
      filter: true,
      editable: false
    }, {
      headerName: 'Status',
      field: 'Active',
      filter: true,
      editable: false,
      cellRenderer: params => {
        return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
      }
    }, {
      headerName: 'Remark',
      field: 'Remark',
      filter: true,
      editable: false
    }]
  }
  status: any;
  // get Employee List
  public getEmployeeList() {
    this.employeeService.getEmployees().subscribe(data => {
      console.log(data);
      this.employees = data
    })
  }


  // on row selecting change
  public onSelectionChanged(event) {
    this.selectedRows = this.gridApi.getSelectedRows();
    //console.log(selectedRows[0].Code);
    this.massage = null;
    this.dataSaved = false;
    this.employeeIdUpdate = this.selectedRows[0].Code;
    this.employeeForm.controls['Title'].setValue(this.selectedRows[0].Title);
    this.employeeForm.controls['FirstName'].setValue(this.selectedRows[0].FirstName);
    this.employeeForm.controls['MiddleName'].setValue(this.selectedRows[0].MiddleName);
    this.employeeForm.controls['LastName'].setValue(this.selectedRows[0].LastName);
    this.employeeForm.controls['Gender'].setValue(this.selectedRows[0].Gender);
    this.employeeForm.controls['Nationality'].setValue(this.selectedRows[0].Nationality);
    this.employeeForm.controls['BirthDate'].setValue(new Date(this.selectedRows[0].BirthDate)); //this.selectedRows[0].BirthDate
    this.employeeForm.controls['Active'].setValue(this.selectedRows[0].Active);
    this.employeeForm.controls['Remark'].setValue(this.selectedRows[0].Remark);
  }
  public onRowClicked($event: any) {
    console.log("yep");
  }
  // // on double click the row
  // public onRowDoubleClicked(event){
  //   console.log("yep");
  //   this.router.navigate(['./SomewhereElse']);
  // }

  //Delete user  
  public deleteEmployee() {
    debugger;
    var selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length == 0) {
      this.toastr.error("error", "Please select a Employee for deletion");
      return;
    }
    this.employeeService.deleteEmployee(selectedRows[0].Code).subscribe(data => {
      this.toastr.success("successfully deleted ", data);
      this.ngOnInit();
    });
  }

  // reset form
  public resetForm() {

    const selectedRows = this.gridApi.getSelectedRows();
    // console.log();
    this.gridApi.deselectAll();
    this.employeeForm.reset();
    this.employeeIdUpdate = null;
    this.massage = null;
    this.dataSaved = false;
  }
}

