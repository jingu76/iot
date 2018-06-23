import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginActivate } from './modules/login/login-active';
import { MainComponent } from './modules/main/main-component';
import { LoginComponent } from './modules/login/login-component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [LoginActivate], loadChildren: './modules/main/main-module#MainModule' },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [LoginActivate]
})
export class AppRoutingModule { }
