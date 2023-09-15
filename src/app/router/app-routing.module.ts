import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../pages/auth/auth.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { BaseProjectComponent } from '../components/base-project/base-project.component';
import { ProjectComponent } from '../components/project/project.component';
import { SettingComponent } from '../components/setting/setting.component';
import { SubTasksComponent } from '../components/sub-tasks/sub-tasks.component';
import { CollaboratorComponent } from '../components/collaborator/collaborator.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { UsersComponent } from '../pages/users/users.component';
import { UsersDashboardComponent } from '../components/users-dashboard/users-dashboard.component';
import { CollaboratorWorkStationComponent } from '../components/collaborator-work-station/collaborator-work-station.component';
import { AdminSeeUserComponent } from '../components/admin/admin-see-user/admin-see-user.component';
import { AdminSeeProjectsComponent } from '../components/admin/admin-see-projects/admin-see-projects.component';
import { FilesUploadComponent } from '../components/admin/files-upload/files-upload.component';
import { AdminSettingsComponent } from '../components/admin/admin-settings/admin-settings.component';
import { ForgotpasswordComponent } from '../components/auth/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from '../components/auth/resetpassword/resetpassword.component';
import { LogsComponent } from '../components/admin/logs/logs.component';
import { AdminOutlineComponent } from '../components/admin-outline/admin-outline.component';
import { AdminDashboardComponent } from '../components/admin/admin-dashboard/admin-dashboard.component';

const routes:Routes = [
  {path:'',component:AuthComponent},
  {path:'forgetpassword',component:ForgotpasswordComponent},
  {path:'resetpassword/:token',component:ResetpasswordComponent},
  {path:'dashboard',component:DashboardComponent,children: [
    {path:'',component:BaseProjectComponent},
    {path:'projects/:id',component:ProjectComponent},
    {path:'projects/:id/:activityId',component:SubTasksComponent},
    {path:'setting',component:SettingComponent},
  ],
  canActivate: [AuthGuard]},
  {path:'admin/login',component:AdminComponent},
  {path:'admin',component:AdminOutlineComponent,children:[
    {path:'dashboard',component:AdminDashboardComponent,children:[
      {path:'',component:AdminSeeUserComponent},
      {path:'projects',component:AdminSeeProjectsComponent},
      {path:'uploadFile',component:FilesUploadComponent},
    ]},
    {path:'logs',component:LogsComponent},
    {path:'settings',component:AdminSettingsComponent},
  ],canActivate: [AuthGuard]},
  {path:'users',component:UsersComponent,children:[
    {path:'',component:UsersDashboardComponent},
    {path:'collaborator/:projectID',component:CollaboratorComponent},
    {path:'collaborator/:projectID/:activityID',component:CollaboratorWorkStationComponent},
    {path:'setting',component:SettingComponent},
  ],
  canActivate: [AuthGuard]},
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
