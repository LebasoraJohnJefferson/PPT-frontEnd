import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { MaterialModule } from './shared/material.module';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StandardUserComponent } from './pages/standard-user/standard-user.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { BaseProjectComponent } from './components/base-project/base-project.component';
import { ProjectComponent } from './components/project/project.component';
import { MechanicalEngineerComponent } from './components/mechanical-engineer/mechanical-engineer.component';
import { CivilEngineerComponent } from './components/civil-engineer/civil-engineer.component';
import { InformationTechnologyComponent } from './components/information-technology/information-technology.component';
import { CreateActivityFormComponent } from './components/create-activity-form/create-activity-form.component';
import { BackBtnComponent } from './components/back-btn/back-btn.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { GanttComponent } from './components/gantt/gantt.component';
import { BarChartsComponent } from './components/bar-charts/bar-charts.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { SubTasksComponent } from './components/sub-tasks/sub-tasks.component';
import { LogsComponent } from './components/logs/logs.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { AsideUserComponent } from './components/aside-user/aside-user.component';
import { PieChartUserComponent } from './components/pie-chart-user/pie-chart-user.component';


// const config: SocketIoConfig = { url: environment.baseURL,
//     options: {
//       // Socket.IO client options
//       transports:["websocket","polling"],
//       path:'/subapi/socket.io/'
//     }};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    StandardUserComponent,
    DateAgoPipe,
    AsideComponent,
    HeaderComponent,
    BaseProjectComponent,
    ProjectComponent,
    MechanicalEngineerComponent,
    CivilEngineerComponent,
    InformationTechnologyComponent,
    CreateActivityFormComponent,
    BackBtnComponent,
    SettingComponent,
    ProjectDetailsComponent,
    GanttComponent,
    BarChartsComponent,
    FeedbackComponent,
    SubTasksComponent,
    LogsComponent,
    PieChartComponent,
    CollaboratorComponent,
    AsideUserComponent,
    PieChartUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    PdfViewerModule,
    NgxSkeletonLoaderModule,
    ToastrModule.forRoot({
      'preventDuplicates': true
    }),
    NgCircleProgressModule.forRoot(
      {
      radius: 100,
      subtitleFontWeight:'900',
      titleFontWeight:'600',
      subtitleFontSize:'30',
      unitsFontSize:'50',
      titleFontSize:'50',
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      }
    )
    // SocketIoModule.forRoot(config)
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
