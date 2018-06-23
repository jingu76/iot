import { I18NModule } from './../i18n/i18n-module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { carDashboardBundle as enBundle } from './res/bundle.en';
import { CarDashboardRoutingModule } from './car-dashboard-routes';
import { CarDashboardComponent } from './car-dashboard-component';
import { BatteryModule } from './../battery/battery-module';
import { CarcardModule } from './../car-card/car-card-module';
import {
    MaterialModule, MdGridListModule,
    MD_PLACEHOLDER_GLOBAL_OPTIONS
} from '@angular/material';
@NgModule({
    declarations: [CarDashboardComponent],
    imports: [CommonModule,
        RouterModule,
        CarDashboardRoutingModule,
        CarcardModule,
        MaterialModule,
        MdGridListModule,
        I18NModule.provideBundles({ en: enBundle })],
    exports: [CarDashboardComponent],
    providers: [{ provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'auto' } }, CookieService]
})
export class CarDashboardModule { }