import { Component, Input } from '@angular/core';
import { CommunicationService } from './../../../shared/service/communication/communication-service';
import { AuthService } from './../../../shared/service/auth/auth-service';
import { Router } from '@angular/router';
import { carDetailBundle } from './../res/bundle.en';

@Component({
    selector: 'app-bar',
    styleUrls: ['./app-bar.scss'],
    templateUrl: './app-bar.html'
})
export class AppBar {
    @Input()
    user = {
        username: 'root'
    };

    private app_bar_return = carDetailBundle.carDetail.app_bar_return;
    private app_bar_exit = carDetailBundle.carDetail.app_bar_exit;

    constructor(private communicationService: CommunicationService, private _router: Router, private authenticationService: AuthService) { }

    logout() {
        this.communicationService.logout().then(() => {
            this.authenticationService.loginModifier(false);
            this._router.navigate(['/login']);
        });
    }

    goback() {
        this._router.navigate(['/main']);
    }
}
