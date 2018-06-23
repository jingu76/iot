import { SpeedmeterComponent } from './speedmeter-component';
import { NgModule } from '@angular/core';
import { I18NModule } from '../i18n/i18n-module';
import { speedmeterBundle as enBundle } from './res/bundle.en';
import { GaugesModule } from 'ng-canvas-gauges/lib';

@NgModule({
    imports: [
        GaugesModule,
        I18NModule.provideBundles({ en: enBundle })
    ],
    exports: [SpeedmeterComponent],
    declarations: [SpeedmeterComponent],
})
export class SpeedmeterModule { }