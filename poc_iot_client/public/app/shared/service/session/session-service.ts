import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CarInformation } from '../carinformation';

@Injectable()
export class SessionService {

    private selectCarInfoAnnouncedSource = new Subject<CarInformation>();
    private currentSelectCarInformation: CarInformation;
    public configureCardAnnounce$ = this.selectCarInfoAnnouncedSource.asObservable();

    public announceSelectCarChange(selectCar: CarInformation) {
        this.currentSelectCarInformation = selectCar;
        this.selectCarInfoAnnouncedSource.next(this.currentSelectCarInformation);
    }

    public getCurrentSelectCar() {
        return this.currentSelectCarInformation;
    }
}
