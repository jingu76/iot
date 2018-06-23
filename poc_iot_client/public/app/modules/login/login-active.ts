import { AuthService } from './../../shared/service/auth/auth-service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable()
export class LoginActivate implements CanActivate, CanActivateChild {

    constructor(private _router: Router, private _authService: AuthService) { }

    public canActivate(): boolean {
        if (this._authService.logined) {
            return true;
        }
        this._router.navigate(['/login']);
        return false;
    }

    public canActivateChild(): boolean {
        return this.canActivate();
    }
}