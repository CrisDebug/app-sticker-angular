import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      return true; // Usuario logueado, permite acceso
    } else {
      this.router.navigate(['/login']); // No logueado, redirige al login
      return false;
    }
  }
}
