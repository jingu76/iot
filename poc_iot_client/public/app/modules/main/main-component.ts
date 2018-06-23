import { Component, OnInit } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { CommunicationService } from './../../shared/service/communication/communication-service';

@Component({
    selector: 'main',
    templateUrl: './main-component.html'
})
export class MainComponent {
    //For examples
    private speed: number = 0;
    // private car1 = { name: '来福士1111', vin: '1111111', attached_map: '3', attached_line: '1', availability: 'serving', condition: 'RUNNING' };
    // private car2 = { name: '来福士2222', vin: '2222222', attached_map: '4', attached_line: '2', availability: 'charging', condition: 'STOPPED' };
    // private car3 = { name: '来福士33333', vin: '3333', attached_map: '4', attached_line: '3', availability: 'standby', condition: 'STOPPED' };
    // private car4 = { name: '来福士4444', vin: '44444', attached_map: '4', attached_line: '4', availability: 'unavailable', condition: 'STOPPED' };
    private intervalTime = 2000;

    constructor(private conmunicationService: CommunicationService) { }

    public ngOnInit() {
        IntervalObservable
            .create(this.intervalTime)
            .subscribe(() => {
                this.speedAutomation();
            });
    }

    private speedAutomation() {
        this.speed = (Math.random() * 100);
    }

}