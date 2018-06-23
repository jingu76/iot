import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CarInformation } from '../../shared/service/carinformation';
import { SessionService } from './../../shared/service/session/session-service';
import { CookieService } from 'angular2-cookie/core';

@Component({
    selector: 'car-card',
    templateUrl: './car-card-component.html',
    styleUrls: ['./car-card-component.scss'],
})
export class CarCardComponent {

    @Input() carinfo: CarInformation;

    constructor(private session: SessionService, private router: Router, private _cookieService: CookieService) { }

    get serving() {
        return this.carinfo && this.carinfo.availability === 'serving';
    }

    get charging() {
        return this.carinfo && this.carinfo.availability === 'charging';
    }

    get standby() {
        return this.carinfo && this.carinfo.availability === 'standby';
    }

    get unavailable() {
        return this.carinfo && this.carinfo.availability === 'unavailable';
    }

    onClick() {
        this.session.announceSelectCarChange(this.carinfo);
        this._cookieService.putObject('carInfo', this.carinfo);
        console.log(`Selected ${this.carinfo && this.carinfo.vin}`);
        this.router.navigate(['/car-detail']);
    }
}