import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CarDetailComponent } from './car-detail-component';

export const MODULE_ROUTES = [
    { path: '', redirectTo: 'car-detail', pathMatch: 'full' },
    { path: 'car-detail', component: CarDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES)],
    exports: [RouterModule],
})
export class CarDetailRoutingModule { }