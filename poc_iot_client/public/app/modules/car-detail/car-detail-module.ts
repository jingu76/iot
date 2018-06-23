import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18NModule } from './../i18n/i18n-module';
import { carDetailBundle as enBundle } from './res/bundle.en';
import { CarDetailComponent } from './car-detail-component';
import { CarDetailRoutingModule } from './car-detail-routes';
import { VideoComponent } from '../video/video-component';
import { AppBar } from './app-bar/app-bar';
import { MapFormComponent } from './../map-form/map-form-component';
import { MapViewComponent } from './../map-view/map-view.component';
import { MaterialModule } from '@angular/material';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
    declarations: [CarDetailComponent, VideoComponent, MapFormComponent, AppBar, MapViewComponent],
    imports: [
        MaterialModule,
        RouterModule,
        CommonModule,
        FormsModule,
        CarDetailRoutingModule,
        I18NModule.provideBundles({ en: enBundle })],
    providers: [CookieService],
    exports: [CarDetailComponent]
})
export class CarDetailModule { }