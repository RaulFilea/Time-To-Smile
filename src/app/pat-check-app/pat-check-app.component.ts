import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: '/patient_check_appointments',
  templateUrl: './pat-check-app.component.html',
  styleUrls: ['./pat-check-app.component.scss'],
})
export class PatCheckAppComponent implements OnInit {
  checkAppForm: FormGroup | undefined;
  email: string | undefined;

  constructor(
    private editFormBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.checkAppForm = this.editFormBuilder.group( {
      email: ['', [Validators.required, Validators.email]]
    })
  }

  validateForm() {
    if(this.checkAppForm?.valid) {
      this.email = this.checkAppForm?.value.email;
      //TODO: store
      //TODO: alert appointments, not send them via email
    } else {
      alert("Invalid format. Retry?")
    }
  }
}
