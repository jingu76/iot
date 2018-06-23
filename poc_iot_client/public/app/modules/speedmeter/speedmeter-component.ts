import { Component, Input } from '@angular/core';

@Component({
    selector: 'speedmeter',
    templateUrl: './speedmeter-component.html',
    styleUrls: ['./speedmeter-component.scss'],
})
export class SpeedmeterComponent {
    @Input() speed: number;
    @Input() width: number = 0;
    @Input() height: number = 0;

    get value() {
        return this.speed;
    }

    get h() {
        return this.height;
    }

    get w() {
        return this.width;
    }

}