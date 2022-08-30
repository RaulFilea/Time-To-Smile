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

//TODO: activate login guard
const routes: Routes = [
  { path: 'filtering', component: FilterTableComponent },
  { path: 'login', component: LoginComponent, title: 'Login' },
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
  { path: 'dashboard', component: DocHomeComponent, title: 'Dashboard' },
  {
    path: 'new-appointment',
    component: CreateAppointmentComponent,
    title: 'Create Appointment',
  },
  { path: 'appointments/:id', component: FilterTableComponent, title: 'Modify Appointment' },
  { path: 'patients', component: ManagePatientsComponent, title: 'Manage Patients' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
