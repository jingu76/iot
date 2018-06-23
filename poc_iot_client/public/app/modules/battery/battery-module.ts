import { NgModule } from '@angular/core';
import { I18NModule } from '../i18n/i18n-module';
import { BatteryComponent } from './battery-component';
import { batteryBundle as enBundle } from './res/bundle.en';

@NgModule({
    imports: [
        I18NModule.provideBundles({ en: enBundle })
    ],
    exports: [BatteryComponent],
    declarations: [BatteryComponent],
    providers: []
})
export class BatteryModule { }