import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ColDef, GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee';
import { Project } from '../../model/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss', '../employee.component.scss']
})

export class ProjectComponent implements OnInit {

  employeeIdUpdate = null;
  dataSaved = false;
  massage = null;
  selectedRows: any;
  public projects: Project[];


  public columnDefs: ColDef[];   // row data and column definitions
  // gridApi and columnApi  
  private gridApi: GridApi;
  private columnApi: ColumnApi;
  public employeeId: any;
  gridOptions: GridOptions; //Declare gridoptions

  submitted: boolean = false;
  projectForm: any; // form name
  projectList: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService, private toastr: ToastrService) {
    this.columnDefs = this.createColumnDefs();

  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      "Name": ["", Validators.required],
      "Description": ["", Validators.required]
    });

    this.getProjectList();
  }

  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space  
  onGridReady(params): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  addContact(){
    console.log(this.projectForm.Name);
    this.projectList.push(
      {Name:this.projectForm.Name},
      {Description : this.projectForm.Description}
    )
  }
  // create column definitions  
  private createColumnDefs() {
    return [{
      headerName: 'ID',
      field: 'Id',
      filter: false,
      editable: false,
      sortable: false
    },{
      headerName: 'Person',
      field: 'Code',
      filter: false,
      editable: false,
      sortable: false
    }, {
      headerName: 'Name',
      field: 'Name',
      filter: false,
      editable: false,
      sortable: false
    }, {
      headerName: 'Description',
      field: 'Description',
      filter: true,
      editable: false,
      sortable: true
    }]
  }
  status: any;

  
  onFormSubmit() {
    this.dataSaved = false;
    const project = this.projectForm.value;
    this.CreateProject(project);
    this.projectForm.reset();
  }


  // get Employee List
  public getProjectList() {
    this.employeeService.getprojects().subscribe(data => {
      console.log(data);
      this.projects = data
    })
  }

  // save method which include creating new and updating existing
  CreateProject(project: Project) {
    if (this.employeeIdUpdate == null) {
      this.employeeService.addProject(project).subscribe(
        () => {
          this.dataSaved = true;
          this.toastr.success("successfully created ");
          this.getProjectList();
          this.employeeIdUpdate = null;
          this.projectForm.reset();
        }
      );
    } else {
      project.id = this.employeeIdUpdate;
      this.employeeService.updateProject(project.id, project).subscribe(() => {
        this.dataSaved = true;
        this.toastr.success("successfully updated ");
        this.getProjectList();
        this.employeeIdUpdate = null;
        this.projectForm.reset();
      });
    }
  }

  // on row selecting change
  public onSelectionChanged(event) {
    this.selectedRows = this.gridApi.getSelectedRows();
    //console.log(selectedRows[0].Code);
    this.massage = null;
    this.dataSaved = false;
    this.employeeIdUpdate = this.selectedRows[0].id;
    this.projectForm.controls['Name'].setValue(this.selectedRows[0].Name);
    this.projectForm.controls['Description'].setValue(this.selectedRows[0].Description);
  }

  //Delete user  
  public deleteProject() {
    debugger;
    var selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length == 0) {
      this.toastr.error("error", "Please select a Project for deletion");
      return;
    }
    this.employeeService.deleteProject(selectedRows[0].Code).subscribe(data => {
      this.toastr.success("successfully deleted ", data);
      this.ngOnInit();
    });
  }

  // reset form
  public resetForm() {

    const selectedRows = this.gridApi.getSelectedRows();
    // console.log();
    this.gridApi.deselectAll();
    this.projectForm.reset();
    this.employeeIdUpdate = null;
    this.massage = null;
    this.dataSaved = false;
  }
}

