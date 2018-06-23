import { DialogComponent } from './components/dialog/dialog-component';
import { ReadOnlyComponent } from './components/read-only/read-only-component';
import { ChangePwdComponent } from './components/change-pwd/change-pwd-component';
import { LoginFormComponent } from './components/login-form/login-form-component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18NModule } from '../i18n/i18n-module';
import { AuthService } from './../../shared/service/auth/auth-service';
import { LoginComponent } from './login-component';
import { loginBundle as enBundle } from './res/bundle.en';
import { DropdownModule } from 'wulf-ngx/src/dropdown/dropdown.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DropdownModule,
        I18NModule.provideBundles({ en: enBundle })
    ],
    exports: [LoginComponent],
    declarations: [LoginComponent, LoginFormComponent, ChangePwdComponent, DialogComponent, ReadOnlyComponent],
    providers: [AuthService]
})
export class LoginModule { }