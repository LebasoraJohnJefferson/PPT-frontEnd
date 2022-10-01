import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/env';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { MaterialModule } from './shared/material.module';
import { HeaderComponent } from './components/header/header.component';
import { AsideComponent } from './components/aside/aside.component';
import { FooterComponent } from './components/footer/footer.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AccountComponent } from './components/account/account.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PertChartComponent } from './components/pert-chart/pert-chart.component';
import { TaskComponent } from './components/task/task.component';
import { ProfileDetailsComponent} from "./components/profile-details/profile-details.component"


const config: SocketIoConfig = { url: environment.baseURL,
    options: {
      // Socket.IO client options
      transports:["websocket","polling"],
      path:'/subapi/socket.io/'
    }};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    CanvasComponent,
    AccountComponent,
    OverviewComponent,
    MessagesComponent,
    ProjectsComponent,
    PertChartComponent,
    TaskComponent,
    ProfileDetailsComponent,
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
