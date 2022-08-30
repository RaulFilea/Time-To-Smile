import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "../models/patient";

@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.scss']
})
export class RequestAppointmentComponent implements OnInit {
  requestAppForm: FormGroup | undefined;
  patient: Patient | undefined;

  constructor(
    private editFormBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.requestAppForm = this.editFormBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern("^[0-9]*$")]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      problem: ['', [Validators.maxLength(5000)]],
      date: ['', [Validators.required]],
      daytime: ['', [Validators.required]],
    })
  }

  requestAppointment() {
    if(this.requestAppForm?.valid) {
      this.patient = {
        name: this.requestAppForm?.value.name,
        email: this.requestAppForm?.value.email,
        phone: this.requestAppForm?.value.phone,
        address: this.requestAppForm?.value.address,
        problem: this.requestAppForm?.value.problem,
      }
      //TODO:store
      //TODO:alert
    } else {
      alert("Invalid data. Retry?")
    }
  }
}
