import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { PersonalDetailComponent } from './employee/personal-detail/personal-detail.component';
import { ProjectComponent } from './employee/project/project.component';

// parent routing [ Main Routing]
const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  //{path: "personal-detail", component: PersonalDetailComponent},
 // {path: "employee", component: EmployeeComponent, pathMatch: 'prefix'},
  //{ path: 'project', component: ProjectComponent, pathMatch: 'prefix' },
   //       {path: "personal-detail", component: PersonalDetailComponent, pathMatch: 'prefix'}
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  //{path: '**', component: PageNotFoundCompnent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { 


}
