import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { AccountComponent } from '../components/account/account.component';
import { OverviewComponent } from '../components/overview/overview.component';
import { MessagesComponent } from '../components/messages/messages.component';
import { ProjectsComponent } from '../components/projects/projects.component';

const routes:Routes = [
  {path:'',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent,
    children:[
      {path:"",component:OverviewComponent},
      {path:'account',component:AccountComponent},
      {path:"messages/:email",component:MessagesComponent},
      {path:"projects/:projectName",component:ProjectsComponent}
    ],
    canActivate: [AuthGuard]
  },  
  {path:'dashboard',component:DashboardComponent},
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
