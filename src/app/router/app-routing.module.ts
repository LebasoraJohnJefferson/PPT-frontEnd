import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../pages/auth/auth.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { DashboardOverviewComponent } from '../components/dashboard-overview/dashboard-overview.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { MembersComponent } from '../components/members/members.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { ReportsComponent } from '../components/reports/reports.component';
import { NotificationComponent } from '../components/notification/notification.component';


const routes:Routes = [
  {path:'',component:AuthComponent},
  {path:'dashboard',component:DashboardComponent,children: [
    { path: 'overview', component:DashboardOverviewComponent },
    { path: 'projects', component:ProjectsComponent },
    { path: 'timeline', component:TimelineComponent },
    { path: 'members', component:MembersComponent },
    { path: 'settings', component:SettingsComponent },
    { path: 'reports', component:ReportsComponent },
    { path: 'notification', component:NotificationComponent },
  ],
  canActivate: [AuthGuard]},
  {path:'**',redirectTo:''}
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
