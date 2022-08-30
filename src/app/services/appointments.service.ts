import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  public getAppointments = (): Observable<Appointment[]> => {
    return this.http.get<Appointment[]>(
      environment.backendURL + '/appointments'
    );
  };

  public getAppointmentDetails = (id: number): Observable<Appointment> => {
    return this.http.get<Appointment>(
      environment.backendURL + '/appointments/' + id
    );
  };

  public deleteAppointment = (id: number): Observable<void> => {
    return this.http.delete<void>(
      environment.backendURL + '/appointments/' + id
    );
  };

  updateAppointment(appointment: Appointment, id: number) {
    return this.http.put(
      environment.backendURL + '/appointments/' + id,
      appointment
    );
  }

  addNewAppointment(appointment: Appointment) {
    return this.http.post(
      environment.backendURL + '/appointments',
      appointment
    );
  }
}
