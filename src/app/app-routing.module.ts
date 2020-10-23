import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { PersonalDetailComponent } from './employee/personal-detail/personal-detail.component';
import { ProjectComponent } from './employee/project/project.component';

const routes: Routes = [
  {path: "", component: PersonalDetailComponent},
  {path: "employee", component: EmployeeComponent},
  { path: 'project', component: ProjectComponent, pathMatch: 'prefix' },
   //       {path: "personal-detail", component: PersonalDetailComponent, pathMatch: 'prefix'}
//   { path: '', redirectTo: '/employee', pathMatch: 'prefix'
// },
//   {path: '**', redirectTo: '/employee/add-employee', pathMatch: 'prefix'}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { 


}
