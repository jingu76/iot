import { Component } from '@angular/core';
import { CommunicationService } from './../../shared/service/communication/communication-service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/observable';
import { CarInformation } from '../../shared/service/carinformation';

@Component({
    selector: 'car-dashboard',
    templateUrl: './car-dashboard-component.html',
    styleUrls: ['./car-dashboard-component.scss']
})
export class CarDashboardComponent {

    private intervalTime = 1000;
    private subscribe;
    private pullIntevel: Observable<number>;
    private cars: CarInformation[] = [];

    constructor(private conmunicationService: CommunicationService) { }

    ngOnDestroy() {
        //destroy interval
        this.subscribe.unsubscribe();
    }

    public ngOnInit() {
        this.subscribe = IntervalObservable
            .create(this.intervalTime).subscribe(() => {
                //TODO: Currently there only has one car and it would not be updated, so when fetches success, no need fetch again. 
                // if (this.cars.length === 0) {
                //pull data from sever. 
                this.conmunicationService.getVehicleInformation().then((vehiclesInfo: any) => {
                    if (vehiclesInfo && Array.isArray(vehiclesInfo.vehicles)) {
                        vehiclesInfo.vehicles.forEach((vehicle) => {
                            let name = vehicle.name;
                            if (name) {
                                let existCar = this.cars.find((car) => {
                                    return car.name === name;
                                });
                                let nameIndex = this.cars.indexOf(existCar);
                                if (nameIndex > -1) {
                                    this.cars.splice(nameIndex, 1);
                                }
                                let car = new CarInformation(name, vehicle.vin, vehicle.attached_map,
                                    vehicle.attached_line, vehicle.availability, vehicle.condition);
                                this.cars.push(car);
                            }
                        });
                    }
                });
                // }
            }
        );
    }
}