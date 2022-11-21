import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../pages/auth/auth.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { DashboardOverviewComponent } from '../admin/components/dashboard-overview/dashboard-overview.component';
import { ProjectsComponent } from '../admin/components/projects/projects.component';
import { TimelineComponent } from '../admin/components/timeline/timeline.component';
import { MembersComponent } from '../admin/components/members/members.component';
import { ReportsComponent } from '../admin/components/reports/reports.component';
import { NotificationComponent } from '../admin/components/notification/notification.component';
import { StandardUserComponent } from '../pages/standard-user/standard-user.component';
import { MemberInfoComponent } from '../admin/components/member-info/member-info.component';
import { ManagersComponent } from '../admin/components/managers/managers.component';
import { ProjectInfoComponent } from '../admin/components/project-info/project-info.component';
import { AdminComponent } from '../admin/components/admin/admin.component';

const routes:Routes = [
  {path:'',component:AuthComponent},
  {path:'dashboard',component:DashboardComponent,children: [
    { path: 'overview', component:DashboardOverviewComponent },
    { path: 'projects', component:ProjectsComponent},
    { path: 'projects/:id', component:ProjectInfoComponent},
    { path: 'timeline', component:TimelineComponent },
    { path: 'managers', component:ManagersComponent },
    { path: 'members', component:MembersComponent },
    { path: 'members/:id', component:MemberInfoComponent },
    { path: 'reports', component:ReportsComponent },
    { path: 'notification', component:NotificationComponent },
    { path: 'admin', component:AdminComponent },
  ],
  canActivate: [AuthGuard]},
  {path:'members',component:StandardUserComponent,canActivate: [AuthGuard]},
  {path:'**',redirectTo:'dashboard/overview'}
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
