import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), data: { animation: 'home' } },
    { path: 'opener', loadComponent: () => import('./pages/opener/opener.component').then(m => m.OpenerComponent), data: { animation: 'opener' } },
    { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent), data: { animation: 'projects' } },
    { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent), data: { animation: 'about' } },
    { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent), data: { animation: 'contact' } },
    { path: '**', redirectTo: '' }
];