
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ColDef, GridApi, ColumnApi, GridOptions } from 'ag-grid-community'; 
import { FormArray,Validators, FormBuilder, FormGroup } from '@angular/forms'; 
import { BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr'; 
import {Router} from '@angular/router';

import { EmployeeService  } from '../../services/employee.service'; 
import { Employee } from '../../model/employee';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.scss', '../employee.component.scss']
})
export class PersonalDetailComponent implements OnInit {
 
  datePickerConfig: Partial <BsDatepickerConfig>;
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
  
  submitted: boolean= false;  
  employeeForm: FormGroup; // form name
  Title: any = ['ATO', 'WRO', 'W/T']; 
  Gender: any = ['Male', 'Female'] ; 
  Nationality: any = ['Ethiopia', 'Kenya', 'Sudan', 'South Sudan', 'Djibuti'] ;
  
  constructor( private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService,private toastr:ToastrService ) {  
      this.columnDefs = this.createColumnDefs(); 
      this.datePickerConfig = Object.assign({},
        {
            containerClass:'theme-dark-blue'
      }); 
      
      this.gridOptions = {
        columnDefs :this.createColumnDefs(),
        masterDetail: true,
       // onRowDoubleClicked(): this.onRowDoubleClicked(any)
      
    }
  }  

  ngOnInit() {  
     
    this.initializeEmployeeForm();
    this.getEmployeeList();
  } 

  private initializeEmployeeForm(){
    this.employeeForm = this.formBuilder.group({  
      Title: ["", Validators.required],  
      "FirstName": ["", Validators.required],  
      "MiddleName": ["", Validators.required],  
      "LastName": ["", Validators.required],  
      "Nationality": ["", Validators.required],  
      "BirthDate": ["", Validators.required],  
      "Gender": ["", Validators.required],  
      "Active": ["", Validators.requiredTrue],  
      "Remark": ["", ],
      "projects": this.formBuilder.array([this.newProject()]),  
    });
  }

  // create form array
  public get projects(): FormArray{
    return this.employeeForm.get("projects") as FormArray;
  }

  // intialize employee Form
  private newProject() : FormGroup{
    return this.formBuilder.group({
      "Name": '',
      "Description" : '',
    })
  }

  // add project Form
  public addProjects(){
    this.projects.push(this.newProject())
  }

  // remove project Form
  public removeProject(i : number){
    if(this.projects.length >1){
      this.projects.removeAt(i);
    }
  }

  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space  
  public onGridReady(params): void {  
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
            sortable: false,
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
            },{  
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
  
  // Choose nationality using select dropdown
  public changeNationality(e) {
  this.Nationality.setValue(e.target.value, {
    onlySelf: true
  })
  }

  // Choose Gender using select dropdown
  public changeGender(e) {
    this.Gender.setValue(e.target.value, {
      onlySelf: true
    })
  }
  //
  public changeTitle(e) {
  this.Title.setValue(e.target.value, {
    onlySelf: true
  })
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }

  
  // get Employee List
  public getEmployeeList(){
    this.employeeService.getEmployees().subscribe(data => { 
      console.log(data); 
      this.employees = data  
  }) 
  }

// save method which include creating new and updating existing
  CreateEmployee(employee: Employee) {
    console.log(this.employeeForm.value);
    if (this.employeeIdUpdate == null) {
      this.employeeService.addEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.toastr.success("successfully created "); 
          this.getEmployeeList();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        }
      );
    } else {
      employee.Code = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee.Code, employee).subscribe(() => {
        this.dataSaved = true;
        this.toastr.success("successfully updated "); 
        this.getEmployeeList();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
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
  public onRowClicked($event: any){
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

