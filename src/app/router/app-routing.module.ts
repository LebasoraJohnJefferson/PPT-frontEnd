import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { ProjectComponent } from '../pages/project/project.component';
import { AccountComponent } from '../components/account/account.component';
import { OverviewComponent } from '../components/overview/overview.component';

const routes:Routes = [
  {path:'',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent,
    children:[
      {path:"",component:OverviewComponent},
      {path:'account',component:AccountComponent}
    ],
    // canActivate: [AuthGuard]
  },  
  {path:'dashboard',component:DashboardComponent},
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
