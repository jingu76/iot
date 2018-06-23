import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectItem } from 'wulf-ngx/src/dropdown/dropdown.module';

@Component({
    selector: 'sc-login__form',
    templateUrl: './login-form-component.html',
    animations: [
        trigger('toggleChanged', [
            state('hidden', style({
                height: '0',
                margin: '0',
                opacity: '0'
            })),
            state('shown', style({
                height: '32px',
                opacity: '1'
            })),
            transition('shown => hidden', animate('200ms ease-out')),
            transition('hidden => shown', animate('200ms ease-in')),
        ])
    ]
})
export class LoginFormComponent implements OnInit {
    private _pending: boolean = false;
    public sslOptions: SelectItem[];

    public loginForm: FormGroup;
    @Output()
    public submitted = new EventEmitter<LoginFormModel>();
    @Output()
    public cancelled = new EventEmitter<void>();
    @Input()
    public allowedSettings: boolean = false;
    public showSettings: boolean = false;

    constructor(fb: FormBuilder) {
        this.loginForm = fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            readOnly: [false],
            ssl: ['https'],
            ipAddress: [location.hostname],
            port: [location.port]
        });
    }

    ngOnInit() {
        this.sslOptions = [
            { label: 'HTTP', value: 'http' },
            { label: 'HTTPS', value: 'https' },
        ];
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

    private disableControls(): void {
        this.loginForm.get('userName').disable();
        this.loginForm.get('password').disable();
        this.loginForm.get('readOnly').disable();
        this.loginForm.get('ssl').disable();
        this.loginForm.get('ipAddress').disable();
        this.loginForm.get('port').disable();
    }

    private enableControls(): void {
        this.loginForm.get('userName').enable();
        this.loginForm.get('password').enable();
        this.loginForm.get('readOnly').enable();
        this.loginForm.get('ssl').enable();
        this.loginForm.get('ipAddress').enable();
        this.loginForm.get('port').enable();
    }

    public toggleSettings(): void {
        this.showSettings = !this.showSettings;
    }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            this.submitted.emit(this.loginForm.value);
        }
    }

    public onCancel(): void {
        this.cancelled.emit();
    }
}

export interface LoginFormModel {
    userName: string;
    password: string;
    readOnly: boolean;
    ssl: string;
    ipAddress: string;
    port: string;
}