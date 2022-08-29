import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PatCheckAppComponent } from './pat-check-app/pat-check-app.component';
import { RequestAppointmentComponent } from './request-appointment/request-appointment.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DocHomeComponent } from './doc-home/doc-home.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { FilterComponent } from './filter/filter.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatCheckAppComponent,
    RequestAppointmentComponent,
    LoginComponent,
    DocHomeComponent,
    CreateAppointmentComponent,
    FilterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
