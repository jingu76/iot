import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'sc-login__readOnly',
    templateUrl: './read-only-component.html'
})
export class ReadOnlyComponent {

    @Input()
    type: string;
    @Input()
    title: string;
    @Input()
    message: string;

    @Output()
    public connected: EventEmitter<void> = new EventEmitter<void>();
    @Output()
    public cancelled: EventEmitter<void> = new EventEmitter<void>();

    public onConnect() {
        this.connected.emit();
    }

    public onCancel() {
        this.cancelled.emit();
    }
}