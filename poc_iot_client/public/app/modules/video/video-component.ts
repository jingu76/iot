import { Component, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'myVideo',
    templateUrl: './video-component.html',
    styleUrls: ['./video-component.scss'],
})
export class VideoComponent {
    @Input() position;

    constructor(protected el?: ElementRef) { }

    get pos() {
        return this.position;
    }

    get nativeElement() {
        return this.el.nativeElement;
    }
}