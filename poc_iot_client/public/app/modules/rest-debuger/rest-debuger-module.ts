import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { I18NModule } from './../i18n/i18n-module';
import { RestDebugerComponent } from './rest-debuger-component';
import { CommunicationService } from './../../shared/service/communication/communication-service';
import {
    MaterialModule,
    MdGridListModule,
    MD_PLACEHOLDER_GLOBAL_OPTIONS
} from '@angular/material';

@NgModule({
    declarations: [RestDebugerComponent],
    imports: [RouterModule,
        MaterialModule,
        MdGridListModule
    ],
    exports: [RestDebugerComponent],
    providers: [CommunicationService]
})
export class RestDebugerModule { }