import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
    selector: 'sc-login__changepwd',
    templateUrl: './change-pwd-component.html',
    animations: [
        trigger('toggleChanged', [
            state('hidden', style({
                height: '0',
                margin: '0',
                opacity: '0'
            })),
            state('shown', style({
                height: '248px',
                opacity: '1'
            })),
            transition('shown => hidden', animate('200ms ease-out')),
            transition('hidden => shown', animate('200ms ease-in')),
        ])
    ]
})
export class ChangePwdComponent {
    private _pending: boolean = false;
    public changePwdForm: FormGroup;
    @Output()
    public submitted = new EventEmitter<ChangePwdModel>();
    @Output()
    public cancelled = new EventEmitter<void>();
    public showRules: boolean = false;

    constructor(fb: FormBuilder) {
        this.changePwdForm = fb.group({
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }

    @Input()
    set pending(isPending: boolean) {
        if (isPending) {
            this.disableControls();
        } else {
            this.enableControls();
        }
        this._pending = isPending;
    }

    get pending() {
        return this._pending;
    }

    private enableControls(): void {
        this.changePwdForm.get('newPassword').enable();
        this.changePwdForm.get('confirmPassword').enable();
    }

    private disableControls(): void {
        this.changePwdForm.get('newPassword').disable();
        this.changePwdForm.get('confirmPassword').disable();
    }

    public toggleRules(): void {
        this.showRules = !this.showRules;
    }

    public onSubmit(): void {
        if (this.changePwdForm.valid) {
            this.submitted.emit(this.changePwdForm.value);
        }
    }

    public onCancel(): void {
        this.cancelled.emit();
    }
}

export interface ChangePwdModel {
    newPassword: string;
    confirmPassword: string;
}