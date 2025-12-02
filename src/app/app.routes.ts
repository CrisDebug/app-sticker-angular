import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RegisterComponent } from './ui/register/register/register.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    {
        path: 'forgot-password',

        loadComponent: () =>
    import('./auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    }
];
