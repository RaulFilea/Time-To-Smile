import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "../models/patient";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) { }

  public getPatients = (): Observable<Patient[]> => {
    return this.http.get<Patient[]>(environment.backendURL + "/patients");
  }

  public getPatientDetails = (id: number): Observable<Patient> => {
    return this.http.get<Patient>(environment.backendURL + "/patients/" + id);
  }

  public deletePatient = (id: number): Observable<void> => {
    return this.http.delete<void>(environment.backendURL + '/patients/' + id);
  }

  updatePatient(patient: Patient, id: number) {
    return this.http.put(environment.backendURL + '/patients/' + id, patient);
  }

  addNewPatient(patient: Patient) {
    return this.http.post(environment.backendURL + '/patients', patient);
  }
}
