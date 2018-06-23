import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LoginFormModel } from './components/login-form/login-form-component';
import { ChangePwdModel } from './components/change-pwd/change-pwd-component';
import { AuthService } from './../../shared/service/auth/auth-service';
import { loginBundle } from './res/bundle.en';
import {
    MdSnackBar,
    MdSnackBarConfig,
    Dir,
} from '@angular/material';
@Component({
    selector: 'sc-login',
    templateUrl: './login-component.html',
    styleUrls: ['./login-component.scss'],
})
export class LoginComponent {

    public loginShow: Observable<boolean>;
    public changePwdShow: Observable<boolean>;
    public readOnlyShow: Observable<boolean>;
    public pending: Observable<boolean>;
    public messageKey: Observable<string>;
    public messageParams: Observable<any[]>;

    public allowedSettings: Observable<boolean>;

    //Snack bar
    private actionButtonLabel: string = 'Retry';
    private action: boolean = false;
    private setAutoHide: boolean = true;
    private autoHide: number = 10000;
    private addExtraClass: boolean = false;

    private title = loginBundle.login.title;
    private version = loginBundle.login.version;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        public snackBar: MdSnackBar, private dir: Dir) {
    }

    public onLogin(loginForm: LoginFormModel): void {
        let userName = loginForm.userName;
        let password = loginForm.password;
        this.loginRequest(userName, password);
        sessionStorage.setItem('login.userName', userName);
        sessionStorage.setItem('login.password', password);
    }

    private loginRequest(
        userName: string,
        password: string): void {
        this._authService.doAuthentic(userName, password).then((vehiclesInfo: any) => {
            if (vehiclesInfo) {
                vehiclesInfo.error_code === 0 ?
                    this._router.navigate(['/main']) : this.open(vehiclesInfo.error_msg);
            }
        });
    }

    public onLoginCancel(): void {
        //TODO: incase the login cancel needed. 
    }

    private open(message: string) {
        let config = new MdSnackBarConfig();
        config.duration = this.autoHide;
        config.extraClasses = this.addExtraClass ? ['party'] : undefined;
        config.direction = this.dir.value;
        this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
    }
}