import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatCheckAppComponent } from './pat-check-app/pat-check-app.component';
import { RequestAppointmentComponent } from './request-appointment/request-appointment.component';
import { LoginComponent } from './login/login.component';
import { DocHomeComponent } from './doc-home/doc-home.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { FilterTableComponent } from './filter-table/filter-table.component';
import {ManagePatientsComponent} from "./manage-patients/manage-patients.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginGuard} from "./guards/login.guard";

//TODO: activate login guard
const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'patient_check_appointments',
    component: PatCheckAppComponent,
    title: 'Check Appointments',
  },
  {
    path: 'request_appointment',
    component: RequestAppointmentComponent,
    title: 'Request New Appointment',
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'dashboard',canActivate: [LoginGuard], component: DocHomeComponent, title: 'Dashboard' },
  {
    path: 'new-appointment',
    component: CreateAppointmentComponent,
    canActivate: [LoginGuard],
    title: 'Create Appointment',
  },
  { path: 'appointments/:id', component: FilterTableComponent, canActivate: [LoginGuard], title: 'Modify Appointment' },
  { path: 'patients', component: ManagePatientsComponent, canActivate: [LoginGuard], title: 'Manage Patients' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent, title: "ERR404"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
