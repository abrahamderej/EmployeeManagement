import { Injectable } from '@angular/core';    
import { HttpClient,   HttpHeaders  } from '@angular/common/http';  
import { Observable } from 'rxjs'; 

import { Employee } from '../model/employee';
import { Project } from '../model/project';

@Injectable({  providedIn: 'root'  })  

export class EmployeeService {
  
  apiUrl: string = "http://localhost:58733/api/People/";
  projectUrl: string = "http://localhost:58733/api/Projects/"; 

  constructor(private http: HttpClient) {}  

  
  public getEmployeeDetailById(Code: string): Observable <Employee>{
      return this.http.get <Employee>(`${this.apiUrl}GetPeopleDetailById` + Code );
  }
  // get list of employees service
  public getEmployees(): Observable < Employee[] > {  
      return this.http.get < Employee[] > (`${this.apiUrl}GetPeopleDetails`);  
  } 
  
  // get list of projects service
  public getprojects(): Observable < Project[] > {  
    return this.http.get < Project[] > (`${this.projectUrl}GetProjectDetails`);  
}  
  

  // create employee service
  public addEmployee(employee: Employee): Observable < string > {  

    const httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json'  
        })  
    };  
    return this.http.post < string > (`${this.apiUrl}InsertPeopleDetails/`, employee, httpOptions);  
} 

// create project service
public addProject(project: Project): Observable < string > {  

    const httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json'  
        })  
    };  
    return this.http.post < string > (`${this.apiUrl}InsertProjectDetails/`, project, httpOptions);  
}  

  // update employee
  public updateEmployee(Code: number, employee: Employee): Observable < string > {  
      const httpOptions = {  
          headers: new HttpHeaders({  
              'Content-Type': 'application/json'  
          })  
      };  
      return this.http.put < string > (`${this.apiUrl}UpdatePeopleDetails/` + Code, employee, httpOptions);  
  }  

  // update project
  public updateProject(id: number, project: Project): Observable < string > {  
    const httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json'  
        })  
    };  
    return this.http.put < string > (`${this.apiUrl}UpdateProjectDetails/` + id, project, httpOptions);  
}

  // delete employee
  public deleteEmployee(Code: string): Observable < string > {  
      const httpOptions = {  
          headers: new HttpHeaders({  
              'Content-Type': 'application/json'  
          })  
      };  
      return this.http.delete < string > (`${this.apiUrl}DeletePeopleDetails/` + Code, httpOptions);  
  }  

   // delete Project
   public deleteProject(id: number): Observable < string > {  
    const httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json'  
        })  
    };  
    return this.http.delete < string > (`${this.apiUrl}DeleteProjectDetails/` + id, httpOptions);  
} 
}  
