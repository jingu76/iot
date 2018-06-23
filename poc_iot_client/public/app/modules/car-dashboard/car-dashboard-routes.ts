import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CarDashboardComponent } from './car-dashboard-component';

export const MODULE_ROUTES = [
    { path: '', redirectTo: 'car-dashboard', pathMatch: 'full' },
    { path: 'car-dashboard', component: CarDashboardComponent },
];

@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES)],
    exports: [RouterModule],
})
export class CarDashboardRoutingModule { }