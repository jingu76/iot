import { I18NModule } from './../i18n/i18n-module';
import { MainRoutingModule } from './main-routes';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main-component';
import { AppBar } from './app-bar/app-bar';
import { NgModule } from '@angular/core';
import { mainBundle as enBundle } from './res/bundle.en';
import { CarcardModule } from './../car-card/car-card-module';

//TODO: temporary here for debug. 
import { BatteryModule } from './../battery/battery-module';
import { SpeedmeterModule } from './../speedmeter/speedmeter-module';
import { CarDashboardModule } from './../car-dashboard/car-dashboard-module';
import { CarDetailModule } from './../car-detail/car-detail-module';
import { RestDebugerModule } from './../rest-debuger/rest-debuger-module';

@NgModule({
    declarations: [MainComponent, AppBar],
    imports: [RouterModule,
        MainRoutingModule,
        I18NModule.provideBundles({ en: enBundle }),
        BatteryModule,
        SpeedmeterModule,
        CarcardModule,
        CarDashboardModule,
        CarDetailModule,
        RestDebugerModule
    ],
    exports: [MainComponent],
})
export class MainModule { }