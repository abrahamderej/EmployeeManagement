import { Injectable } from '@angular/core';    
import { HttpClient,   HttpHeaders  } from '@angular/common/http';  
import { Observable } from 'rxjs'; 

import { Employee } from '../model/employee';
import { Person } from '../model/person';

@Injectable({  providedIn: 'root'  })  

export class EmployeeService {
  
  apiUrl: string = "http://localhost:60008/api/Employee/" 

  constructor(private http: HttpClient) {}  

  editEmployee(employee: Employee) {  
      return this.http.put(this.apiUrl + 'UpdateEmployeeDetails/', employee);  
  }  

  public getEmployeeDetailById(Code: string): Observable <Employee>{
      return this.http.get <Employee>(`${this.apiUrl}GetEmployeeDetailById` + Code );
  }
  // get list of employees service
  public getEmployees(): Observable < Employee[] > {  
      return this.http.get < Employee[] > (`${this.apiUrl}GetEmployeeDetails`);  
  }  

  // create employee service
  public addEmployee(employee: Employee): Observable < string > {  

      const httpOptions = {  
          headers: new HttpHeaders({  
              'Content-Type': 'application/json'  
          })  
      };  
      return this.http.post < string > (`${this.apiUrl}/InsertEmployeeDetails/`, employee, httpOptions);  
  }  

  // update employee
  public updateEmployee(employee: Employee): Observable < string > {  
      const httpOptions = {  
          headers: new HttpHeaders({  
              'Content-Type': 'application/json'  
          })  
      };  
      return this.http.put < string > (`${this.apiUrl}UpdateEmployeeDetails/`, employee, httpOptions);  
  }  

  // delete employee
  public deleteEmployee(Code: string): Observable < string > {  
      const httpOptions = {  
          headers: new HttpHeaders({  
              'Content-Type': 'application/json'  
          })  
      };  
      return this.http.delete < string > (`${this.apiUrl}DeleteEmployeeDetails?Code=` + Code, httpOptions);  
  }  
}  
