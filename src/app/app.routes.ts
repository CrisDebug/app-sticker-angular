import { Routes } from '@angular/router';

// Componentes existentes
import { RegisterComponent } from './ui/register/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CatalogoTailwindComponent } from './pages/catalogo-tailwind/catalogo-tailwind.component';

// Nuevo componente de bienvenida
import { LandingComponent } from './pages/landing/landing.component';

// Guard que protege rutas de usuarios no logueados
import { AuthGuard } from './auth/auth.guard';

// ===========================
// Definición de rutas
// ===========================
export const routes: Routes = [
  // Página de bienvenida
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent  // Primera vista cuando el usuario entra
  },

  // Registro
  {
    path: 'register',
    component: RegisterComponent
  },

  // Login
  {
    path: 'login',
    component: LoginComponent
  },

  // Catálogo protegido con guard
  {
    path: 'catalogo-tailwind',
    component: CatalogoTailwindComponent,
    canActivate: [AuthGuard]  // ← Solo usuarios logueados podrán acceder
  },

  // Forgot password cargado de forma lazy
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./auth/forgot-password/forgot-password.component')
        .then(m => m.ForgotPasswordComponent)
  },

  // Ruta comodín: cualquier URL inválida redirige a Landing
  {
    path: '**',
    redirectTo: ''
  }
];
