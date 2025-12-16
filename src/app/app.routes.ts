
import { Routes } from '@angular/router';
import { RegisterComponent } from './ui/register/register/register.component';
import { LoginComponent } from './auth/login/login.component';

// import para el catalogo
import { CatalogoTailwindComponent } from './pages/catalogo-tailwind/catalogo-tailwind.component';



export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'catalogo-tailwind', component: CatalogoTailwindComponent },//ruta para el catalogo

    {
        path: 'forgot-password',

        loadComponent: () =>
    import('./auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    }
];
