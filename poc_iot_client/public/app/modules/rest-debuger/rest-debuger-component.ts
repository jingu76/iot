import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../../shared/service/communication/communication-service';

@Component({
    selector: 'rest-debuger',
    templateUrl: './rest-debuger-component.html',
    styleUrls: ['./rest-debuger-component.scss']
})
export class RestDebugerComponent {

    private loginResult: string = '';
    private logoutResult: string = '';
    private controlModeChangeToManualResult: string = '';
    private controlModeChangeToAutoResult: string = '';
    private startVehicleResult: string = '';
    private pauseVehicleResult: string = '';
    private setMapResult: string = '';
    private selectLineResult: string = '';
    private cancelRouteResult: string = '';
    private selectStopResult: string = '';
    private getVehicleInformationResult: string = '';
    private getTrackingResult: string = '';
    private getRouteResult: string = '';
    private getMapResult: string = '';

    constructor(private communicationService: CommunicationService) {}

    public login() {
        this.communicationService.login('root', 'root').then((result: any) => {
            if (result && result.text) {
                this.loginResult = JSON.stringify(result.text);
            }
        });
    }

    public logout() {
        this.communicationService.logout().then((result: any) => {
            if (result && result.text) {
                this.logoutResult = JSON.stringify(result.text);
            }
        });
    }

    public controlModeChangeToManual() {
        this.communicationService.controlModeChangeToManual('e100.uisee.car1').then((result: any) => {
            if (result && result.text) {
                this.controlModeChangeToManualResult = JSON.stringify(result.text);
            }
        });
    }

    public controlModeChangeToAuto() {
        this.communicationService.controlModeChangeToAuto('e100.uisee.car1').then((result: any) => {
            if (result && result.text) {
                this.controlModeChangeToAutoResult = JSON.stringify(result.text);
            }
        });
    }

    public startVehicle() {
        this.communicationService.startVehicle('e100.uisee.car1').then((result: any) => {
            if (result && result.text) {
                this.startVehicleResult = JSON.stringify(result.text);
            }
        });
    }

    public pauseVehicle() {
        this.communicationService.pauseVehicle('e100.uisee.car1').then((result: any) => {
            if (result && result.text) {
                this.pauseVehicleResult = JSON.stringify(result.text);
            }
        });
    }

    public setMap() {
        this.communicationService.setMap('e100.uisee.car1', '3').then((result: any) => {
            if (result && result.text) {
                this.setMapResult = JSON.stringify(result.text);
            }
        });
    }

    public selectLine() {
        this.communicationService.selectLine('e100.uisee.car1', '0').then((result: any) => {
            if (result && result.text) {
                this.selectLineResult = JSON.stringify(result.text);
            }
        });
    }

    public cancelRoute() {
        this.communicationService.cancelRoute('e100.uisee.car1').then((result: any) => {
            if (result && result.text) {
                this.cancelRouteResult = JSON.stringify(result.text);
            }
        });
    }

    public selectStop() {
        this.communicationService.selectStop('e100.uisee.car1', '3', '0', '1').then((result: any) => {
            if (result && result.text) {
                this.selectStopResult = JSON.stringify(result.text);
            }
        });
    }

    public getVehicleInformation() {
        this.communicationService.getVehicleInformation().then((result: any) => {
            if (result && result.text) {
                this.getVehicleInformationResult = JSON.stringify(result.text);
            }
        });
    }

    public getTracking() {
        this.communicationService.getTracking('e100.uisee.car1').then((result: any) => {
            if (result && result.text) {
                this.getTrackingResult = JSON.stringify(result.text);
            }
        });
    }

    public getRoute() {
        this.communicationService.getRoute('e100.uisee.car1').then((result: any) => {
            if (result && result.text) {
                this.getRouteResult = JSON.stringify(result.text);
            }
        });
    }

    public getMap() {
        this.communicationService.getMap('e100.uisee.car1').then((result: any) => {
            if (result && result.text) {
                this.getMapResult = JSON.stringify(result.text);
            }
        });
    }
}




