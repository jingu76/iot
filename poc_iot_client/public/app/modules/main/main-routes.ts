import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const MODULE_ROUTES = [
  { path: '', redirectTo: 'car-dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(MODULE_ROUTES)],
  exports: [RouterModule],
})
export class MainRoutingModule { }