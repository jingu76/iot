import { NgModule } from '@angular/core';
import { CarCardComponent } from './car-card-component';
import { I18NModule } from '../i18n/i18n-module';
import { CarcardBundle as enBundle } from './res/bundle.en';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
    imports: [
        I18NModule.provideBundles({ en: enBundle })
    ],
    exports: [CarCardComponent],
    declarations: [CarCardComponent],
    providers: [CookieService]
})
export class CarcardModule { }