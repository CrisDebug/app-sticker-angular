import { Component } from '@angular/core';
import { ReactiveFormsModule , FormGroup , Validators , FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  formEnviado: boolean =false;

  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email:              ['',[Validators.required, Validators.email]],
      password:          ['',[Validators.required, Validators.minLength(8)]]
    })
  }




  //validacion de ingreso(submit)
  onSubmit(){
    if(this.loginForm.valid)
    {
      this.formEnviado = true;
      this.loginForm.reset();
      console.log('ingreso correcto', this.loginForm.value);   
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
