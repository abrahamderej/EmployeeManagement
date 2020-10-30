import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component';
import { ProjectComponent } from './project/project.component';
import { PersonListComponent } from './person-list/person-list.component';

// routing variable for child
const routes: Routes = [
    {
        path: 'employee',
        component: EmployeeComponent,
        pathMatch: 'prefix', 
        children: [
          {path: "personal-detail", component: PersonalDetailComponent, pathMatch: 'prefix'},
          {path: 'project', component: ProjectComponent, pathMatch: 'prefix' },
          {path: "person-list", component: PersonListComponent, pathMatch: 'prefix'}

      ]
    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class EmployeeRoutingModule { 


}