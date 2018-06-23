import { Component, Input } from '@angular/core';

@Component({
    selector: 'battery',
    templateUrl: './battery-component.html',
    styleUrls: ['./battery-component.scss'],
})
export class BatteryComponent {
    @Input() quantity: number = 1;

    get width() {
        return this.quantity * 20 + 'px';
    }

    get bg() {
        if (this.quantity > 0.6) {
            return 'green';
        } else if (this.quantity > 0.3) {
            return 'orange';
        } else {
            return 'red';
        }
    }
}