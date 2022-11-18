import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { MaterialModule } from './shared/material.module';

import { FooterComponent } from './admin/components/footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AsideComponent } from './admin/components/aside/aside.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardOverviewComponent } from './admin/components/dashboard-overview/dashboard-overview.component';
import { ProjectsComponent } from './admin/components/projects/projects.component';
import { TimelineComponent } from './admin/components/timeline/timeline.component';
import { MembersComponent } from './admin/components/members/members.component';
import { ReportsComponent } from './admin/components/reports/reports.component';
import { NotificationComponent } from './admin/components/notification/notification.component';
import { BarChartsComponent } from './admin/components/bar-charts/bar-charts.component';
import { ButtonAsideOpenComponent } from './admin/components/button-aside-open/button-aside-open.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StandardUserComponent } from './pages/standard-user/standard-user.component';
import { MemberInfoComponent } from './admin/components/member-info/member-info.component';
import { BackBtnComponent } from './admin/components/back-btn/back-btn.component';
import { ManagersComponent } from './admin/components/managers/managers.component';
import { ProjectInfoComponent } from './admin/components/project-info/project-info.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { DependencyChartComponent } from './admin/components/dependency-chart/dependency-chart.component';
import { DoughnutChartsComponent } from './admin/components/doughnut-charts/doughnut-charts.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


const config: SocketIoConfig = { url: environment.baseURL,
    options: {
      // Socket.IO client options
      transports:["websocket","polling"],
      path:'/subapi/socket.io/'
    }};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AsideComponent,
    DashboardComponent,
    FooterComponent,
    DashboardOverviewComponent,
    ProjectsComponent,
    TimelineComponent,
    MembersComponent,
    ReportsComponent,
    NotificationComponent,
    BarChartsComponent,
    ButtonAsideOpenComponent,
    StandardUserComponent,
    MemberInfoComponent,
    BackBtnComponent,
    ManagersComponent,
    ProjectInfoComponent,
    DateAgoPipe,
    DependencyChartComponent,
    DoughnutChartsComponent,
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
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
