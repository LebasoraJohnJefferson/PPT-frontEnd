import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../pages/auth/auth.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { StandardUserComponent } from '../pages/standard-user/standard-user.component';
import { BaseProjectComponent } from '../components/base-project/base-project.component';
import { ProjectComponent } from '../components/project/project.component';
import { SettingComponent } from '../components/setting/setting.component';
import { SubTasksComponent } from '../components/sub-tasks/sub-tasks.component';

const routes:Routes = [
  {path:'',component:AuthComponent},
  {path:'dashboard',component:DashboardComponent,children: [
    {path:'',component:BaseProjectComponent},
    {path:'projects/:id',component:ProjectComponent},
    {path:'projects/:id/:activityId',component:SubTasksComponent},
    {path:'setting',component:SettingComponent},
  ],
  canActivate: [AuthGuard]},
  {path:'members',component:StandardUserComponent,canActivate: [AuthGuard]},
  {path:'**',redirectTo:'dashboard'}
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
