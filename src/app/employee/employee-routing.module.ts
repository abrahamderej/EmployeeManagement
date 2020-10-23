import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
    {
        path: 'employee',
        component: EmployeeComponent,
        pathMatch: 'prefix', 
        children: [
          { path: 'project', component: ProjectComponent, pathMatch: 'prefix' },
          {path: "personal-detail", component: PersonalDetailComponent, pathMatch: 'prefix'}
      ]
    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class EmployeeRoutingModule { 


}