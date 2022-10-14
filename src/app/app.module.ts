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

import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AsideComponent } from './components/aside/aside.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MembersComponent } from './components/members/members.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NotificationComponent } from './components/notification/notification.component';
import { BarChartsComponent } from './components/bar-charts/bar-charts.component';
import { ButtonAsideOpenComponent } from './components/button-aside-open/button-aside-open.component';

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
    SettingsComponent,
    ReportsComponent,
    NotificationComponent,
    BarChartsComponent,
    ButtonAsideOpenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
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
