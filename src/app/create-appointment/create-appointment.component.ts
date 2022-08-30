import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PatientsService } from '../services/patients.service';
import {Patient} from "../models/patient";
import {MatAutocompleteActivatedEvent} from "@angular/material/autocomplete";
import {AppointmentsService} from "../services/appointments.service";
import {Router} from "@angular/router";

export interface PatientGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
})
export class CreateAppointmentComponent implements OnInit {
  patientForm = this._formBuilder.group({
    patientGroup: '',
    patProblem: '',
    patDate: '',
    patTime: ''
  });

  patientGroup: PatientGroup[] = [];
  patients: Patient[] | undefined;
  patient: Patient | undefined;
  patientGroupOptions!: Observable<PatientGroup[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private patientService: PatientsService,
    private appointmentService: AppointmentsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.patientService
      .getPatients()
      .pipe(take(1))
      .subscribe((patients) => {
        this.patients = patients;
        patients
          .sort((a, b) => a.name.localeCompare(b.name))
          .forEach((p) => {
            const letter = p.name[0].toUpperCase();
            const group = this.patientGroup.find((o) => o.letter === letter);
            if (group === undefined) {
              this.patientGroup.push({ letter: letter, names: [p.name] });
            } else {
              group.names.push(p.name);
            }
          });
      });
    this.patientGroupOptions = this.patientForm
      .get('patientGroup')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGroup(value || ''))
      );
  }

  private _filterGroup(value: string): PatientGroup[] {
    if (value) {
      return this.patientGroup
        .map((group) => ({
          letter: group.letter,
          names: _filter(group.names, value),
        }))
        .filter((group) => group.names.length > 0);
    }

    return this.patientGroup;
  }

  saveAppointment() {
    if(this.patient == undefined){
      return;
    }
    this.patient.problem = this.patientForm.controls.patProblem.value!;
    this.patientService.updatePatient(this.patient, this.patient.id!).pipe(take(1)).subscribe();
    this.appointmentService.addNewAppointment({
      date: this.patientForm.controls.patDate.value!,
      time: this.patientForm.controls.patTime.value!,
      patient_id: this.patient.id!,
      confirmed: true
    }).pipe(take(1)).subscribe(() => {
        alert("Appointment saved successfully!");
          this.router.navigateByUrl('/dashboard')
      }
    );
  }

  optionSelected(event: MatAutocompleteActivatedEvent) {
    this.patient = this.patients!.find(p => p.name === event.option?.value);
    this.patientForm.controls.patProblem.setValue(this.patient!.problem);
  }
}
