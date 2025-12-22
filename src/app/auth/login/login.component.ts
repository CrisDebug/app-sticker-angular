// login.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // ===========================
  // PROPIEDADES DEL COMPONENTE
  // ===========================
  loginForm: FormGroup;        // Formulario reactivo
  formEnviado: boolean = false; // Indica si el login fue exitoso
  rol: string = 'user';         // Rol del usuario logueado
  usuarioActual: any = null;    // Datos del usuario logueado

  // Usuarios "hardcodeados" para evitar problemas de carga asincrónica
  usuarios: any[] = [
    { email: 'admin@stickers.cl', password: 'Admin123!', nombre: 'Administrador', rol: 'ADMIN' },
    { email: 'user@stickers.cl', password: 'User123!', nombre: 'Usuario', rol: 'USER' }
  ];

  // ===========================
  // CONSTRUCTOR
  // ===========================
  constructor(
    private fb: FormBuilder,   // Para construir formulario reactivo
    private router: Router     // Para redirigir después del login
  ) {
    // Inicializamos formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // ===========================
  // MÉTODOS DEL COMPONENTE
  // ===========================

  /**
   * Método llamado al enviar el formulario
   * - Valida email y password
   * - Compara con usuarios "hardcodeados"
   * - Guarda datos en localStorage
   * - Redirige al catálogo según rol
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // Buscar usuario
      const usuario = this.usuarios.find(u => u.email === email && u.password === password);

      if (usuario) {
        // Guardar datos del usuario en memoria y localStorage
        this.usuarioActual = usuario;
        this.rol = usuario.rol;
        localStorage.setItem('usuario', JSON.stringify(this.usuarioActual));
        localStorage.setItem('rol', this.rol);

        // Indicar login exitoso
        this.formEnviado = true;

        // Redirigir automáticamente al catálogo
        this.router.navigate(['/catalogo-tailwind']);
      } else {
        alert('Email o contraseña incorrectos');
      }
    } else {
      // Marcar todos los campos como tocados para mostrar errores de validación
      this.loginForm.markAllAsTouched();
    }
  }

  /**
   * Método para saber si hay usuario logueado
   */
  isLoggedIn() {
    return localStorage.getItem('usuario') !== null;
  }
}


/*este codigo funcionaba para simular un ingreso correcto a traves de un mensaje en el metodo onSubmit*/
/*import { Component } from '@angular/core';
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
}*/
