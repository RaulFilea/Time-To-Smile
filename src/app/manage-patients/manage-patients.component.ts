import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PatientsService } from '../services/patients.service';
import { Patient } from '../models/patient';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { AppointmentsService } from '../services/appointments.service';
import { Router } from '@angular/router';

export interface PatientGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.scss'],
})
export class ManagePatientsComponent implements OnInit {
  patientForm = this._formBuilder.group({
    patientGroup: '',
    patName: '',
    patEmail: '',
    patPhone: '',
    patHomeAddress: '',
    patProblem: '',
  });

  patientGroup: PatientGroup[] = [];
  patients: Patient[] | undefined;
  patient: Patient = {
    id: -1,
    name: '',
    email:'',
    phone:'',
    address:'',
    problem:''
  }
  patientGroupOptions!: Observable<PatientGroup[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private patientService: PatientsService
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

  optionSelected(event: MatAutocompleteActivatedEvent) {
    this.patient = this.patients!.find((p) => p.name === event.option?.value)!;
    this.patientForm.controls.patName.setValue(this.patient!.name);
    this.patientForm.controls.patEmail.setValue(this.patient!.email);
    this.patientForm.controls.patPhone.setValue(this.patient!.phone);
    this.patientForm.controls.patHomeAddress.setValue(this.patient!.address);
    this.patientForm.controls.patProblem.setValue(this.patient!.problem);
  }

  savePatDetails() {
    this.patient.name = this.patientForm.controls.patName.value!;
    this.patient.email = this.patientForm.controls.patEmail.value!;
    this.patient.phone = this.patientForm.controls.patPhone.value!;
    this.patient.address = this.patientForm.controls.patHomeAddress.value!;
    this.patient.problem = this.patientForm.controls.patProblem.value!;

    if (this.patient.id != -1) {
      this.patientService.updatePatient(this.patient, this.patient.id!).pipe(take(1)).subscribe();
      alert("Patient details updated!");
      window.location.reload();
    } else {
      this.patientService.addNewPatient(this.patient).pipe(take(1)).subscribe();
      alert("New patient added!");
      window.location.reload();
    }
  }

  deletePatDetails() {
    if(confirm("Are you sure you want to delete this patient?")) {
      this.patientService.deletePatient(this.patient.id!).pipe(take(1)).subscribe();
      window.location.reload();
    }

  }

  unselectPat(event:any) {
    if(this.patientForm.controls.patientGroup.value === '') {
      this.patientForm.controls.patName.setValue('');
      this.patientForm.controls.patEmail.setValue('');
      this.patientForm.controls.patPhone.setValue('');
      this.patientForm.controls.patHomeAddress.setValue('');
      this.patientForm.controls.patProblem.setValue('');
    }
  }
}
