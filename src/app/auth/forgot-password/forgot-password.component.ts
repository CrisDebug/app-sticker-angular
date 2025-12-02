import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {


  forgotPasswordForm: FormGroup;

  linkEnviado:boolean =false;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm= this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this. linkEnviado= true;
      this.forgotPasswordForm.reset();
      console.log("Solicitud enviada", this.forgotPasswordForm.value.email);
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
