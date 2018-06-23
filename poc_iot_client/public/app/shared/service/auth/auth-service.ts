import { Injectable } from '@angular/core';
import { CommunicationService } from './../communication/communication-service';

@Injectable()
export class AuthService {

    private _logined: boolean = false;

    constructor(private communicationService: CommunicationService) { }

    public doAuthentic(
        userName: string,
        password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.loginModifier(true);
            this.communicationService.login(userName, password).then((response) => {
                resolve(response);
            });
        });
    }

    public loginModifier(login: boolean): void {
        this._logined = login;
    }

    get logined(): boolean {
        return this._logined;
    }
}
