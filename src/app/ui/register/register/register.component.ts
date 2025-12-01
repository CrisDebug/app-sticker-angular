import { Component } from '@angular/core';
import { ReactiveFormsModule , FormGroup , Validators , FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  registerForm: FormGroup;

  formEnviado: boolean =false;

  constructor(private fb: FormBuilder){
    this.registerForm = this.fb.group({
      name:             ['', [Validators.required, Validators.minLength(2)]],
      email:              ['',[Validators.required, Validators.email]],
      password:          ['',[Validators.required, Validators.minLength(8)]],
      confirmedPassword:  ['', Validators.required],
      terms:              [false, [Validators.requiredTrue]]
    },{ validators: this.passwordMatch});
  }

  //metodo para validar el match de la clave , es una confirmacion del formato
  passwordMatch(form:FormGroup){
    const pass= form.get('password')?.value;
    const confirm = form.get('confirmedPassword')?.value;
    return pass === confirm ? null : {misMatch: true};
  }
  //validacion de envio(submit)
  onSubmit(){
    if(this.registerForm.valid)
    {
      this.formEnviado = true;
      this.registerForm.reset();
      console.log('Datos enviados', this.registerForm.value);   
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }

}
