import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { I18NModule } from './../../../i18n/i18n-module';
import { loginBundle as enBundle } from './../../res/bundle.en';
import { LoginFormComponent } from './login-form-component';
import { DropdownModule } from 'wulf-ngx/src/dropdown/dropdown.module';

describe('Test login-form-component.ts', () => {
    let fixture: ComponentFixture<LoginFormComponent>;
    let component: LoginFormComponent;
    let userNameField: DebugElement;
    let passwordField: DebugElement;
    let readOnlyCheckbox: DebugElement;
    let submitButton: DebugElement;
    let cancelButton: DebugElement;
    let sslSelection: DebugElement;
    let ipAddressField: DebugElement;
    let portField: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                BrowserAnimationsModule,
                DropdownModule,
                I18NModule.provideBundles({ en: enBundle })
            ],
            declarations: [
                LoginFormComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        component.allowedSettings = true;
        fixture.detectChanges();
        userNameField = fixture.debugElement.query(By.css('input[formControlName="userName"]'));
        passwordField = fixture.debugElement.query(By.css('input[formControlName="password"]'));
        readOnlyCheckbox = fixture.debugElement.query(By.css('input[formControlName="readOnly"]'));
        submitButton = fixture.debugElement.query(By.css('button[name="submit"]'));
        cancelButton = fixture.debugElement.query(By.css('button[name="cancel"]'));
        sslSelection = fixture.debugElement.query(By.css('wf-dropdown[formControlName="ssl"]'));
        ipAddressField = fixture.debugElement.query(By.css('input[formControlName="ipAddress"]'));
        portField = fixture.debugElement.query(By.css('input[formControlName="port"]'));
    });

    afterEach(() => {
        fixture = undefined;
        component = undefined;
        userNameField = undefined;
        passwordField = undefined;
        submitButton = undefined;
        cancelButton = undefined;
        ipAddressField = undefined;
        portField = undefined;
    });

    describe('#Input Action', () => {

        it('Should enabled login button all fields input', (done) => {
            sendInput(
                { element: userNameField, value: 'Nemuadmin' },
                { element: passwordField, value: 'neumuser' },
                { element: ipAddressField, value: 'localhost' },
                { element: portField, value: '3001' }
            ).then(() => {
                expect(submitButton.nativeElement.disabled).toBeFalsy();
                expect(cancelButton.nativeElement.disabled).toBeTruthy();
                done();
            }).catch(() => {
                fail('input value failed.');
                done();
            });
        });

        it('Should disable login button when missing user name input', (done) => {
            sendInput(
                { element: userNameField, value: '' },
                { element: passwordField, value: 'neumuser' },
                { element: ipAddressField, value: 'localhost' },
                { element: portField, value: '3001' }
            ).then(() => {
                expect(submitButton.nativeElement.disabled).toBeTruthy();
                expect(cancelButton.nativeElement.disabled).toBeTruthy();
                done();
            }).catch(() => {
                fail('input value failed.');
                done();
            });
        });

        it('Should disable login button when missing password input', (done) => {

            sendInput(
                { element: userNameField, value: 'Nemuadmin' },
                { element: passwordField, value: '' },
                { element: ipAddressField, value: 'localhost' },
                { element: portField, value: '3001' }
            ).then(() => {
                expect(submitButton.nativeElement.disabled).toBeTruthy();
                expect(cancelButton.nativeElement.disabled).toBeTruthy();
                done();
            }).catch(() => {
                fail('input value failed.');
                done();
            });
        });

        it('Should disable login button when missing ip address input', (done) => {
            sendInput(
                { element: userNameField, value: 'Nemuadmin' },
                { element: passwordField, value: 'neumuser' },
                { element: ipAddressField, value: '' },
                { element: portField, value: '3001' }
            ).then(() => {
                expect(submitButton.nativeElement.disabled).toBeTruthy();
                expect(cancelButton.nativeElement.disabled).toBeTruthy();
                done();
            }).catch(() => {
                fail('input value failed.');
                done();
            });
        });

        it('Should disable log in button when missing port input', (done) => {
            sendInput(
                { element: userNameField, value: 'Nemuadmin' },
                { element: passwordField, value: 'neumuser' },
                { element: ipAddressField, value: 'localhost' },
                { element: portField, value: '' }
            ).then(() => {
                expect(submitButton.nativeElement.disabled).toBeTruthy();
                expect(cancelButton.nativeElement.disabled).toBeTruthy();
                done();
            }).catch(() => {
                fail('input value failed.');
                done();
            });
        });

        it('Should disable log in button when missing all fields input', (done) => {
            sendInput(
                { element: userNameField, value: '' },
                { element: passwordField, value: '' },
                { element: ipAddressField, value: '' },
                { element: portField, value: '' }
            ).then(() => {
                expect(submitButton.nativeElement.disabled).toBeTruthy();
                expect(cancelButton.nativeElement.disabled).toBeTruthy();
                done();
            }).catch(() => {
                fail('input value failed.');
                done();
            });
        });
    });

    describe('#Pending input', () => {

        beforeEach((done) => {
            sendInput(
                { element: userNameField, value: 'Nemuadmin' },
                { element: passwordField, value: 'neumuser' },
                { element: ipAddressField, value: 'localhost' },
                { element: portField, value: '3001' }
            ).then(done).catch(done);
        });

        it('Should disable input fields when pending is true', () => {
            component.pending = true;
            fixture.detectChanges();
            expect(userNameField.nativeElement.disabled).toBeTruthy();
            expect(passwordField.nativeElement.disabled).toBeTruthy();
            expect(readOnlyCheckbox.nativeElement.disabled).toBeTruthy();
            expect(submitButton.nativeElement.disabled).toBeTruthy();
            expect(sslSelection.componentInstance.disabled).toBeTruthy();
            expect(ipAddressField.nativeElement.disabled).toBeTruthy();
            expect(portField.nativeElement.disabled).toBeTruthy();
            expect(cancelButton.nativeElement.disabled).toBeFalsy();
        });

        it('Should enable input fields when pending is false', () => {
            component.pending = false;
            fixture.detectChanges();
            expect(userNameField.nativeElement.disabled).toBeFalsy();
            expect(passwordField.nativeElement.disabled).toBeFalsy();
            expect(readOnlyCheckbox.nativeElement.disabled).toBeFalsy();
            expect(submitButton.nativeElement.disabled).toBeFalsy();
            expect(sslSelection.componentInstance.disabled).toBeFalsy();
            expect(ipAddressField.nativeElement.disabled).toBeFalsy();
            expect(portField.nativeElement.disabled).toBeFalsy();
            expect(cancelButton.nativeElement.disabled).toBeTruthy();
        });
    });

    describe('#toggleSettings', () => {
        let originalTimeout: number;
        let rulesDiv: DebugElement;
        beforeEach(() => {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
            rulesDiv = fixture.debugElement.query(By.css('div[name="settings"]'));
        });
        afterEach(() => {
            rulesDiv = undefined;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

        it('Should show advantage settings', (done) => {
            component.showSettings = true;
            fixture.detectChanges();
            fixture.whenRenderingDone().then(() => {
                expect(rulesDiv.nativeElement.style.height).toBe('32px');
                done();
            }).catch(() => {
                fail('show advantage settings failed.');
                done();
            });
        });

        it('Should hide advantage settings', (done) => {
            component.showSettings = false;
            fixture.detectChanges();
            fixture.whenRenderingDone().then(() => {
                expect(rulesDiv.nativeElement.style.height).toBe('0px');
                done();
            }).catch(() => {
                fail('hide advantage settings failed.');
                done();
            });
        });
    });

    describe('#Login #Cancel', () => {

        beforeEach((done) => {
            sendInput(
                { element: userNameField, value: 'Nemuadmin' },
                { element: passwordField, value: 'neumuser' },
                { element: ipAddressField, value: 'localhost' },
                { element: portField, value: '3001' }
            ).then(done).catch(done);
        });

        it('Should submittted event emit with expected values', fakeAsync(() => {
            spyOn(component.submitted, 'emit');
            submitButton.nativeElement.click();
            fixture.detectChanges();
            tick();
            expect(component.submitted.emit).toHaveBeenCalledWith({
                userName: 'Nemuadmin',
                password: 'neumuser',
                readOnly: false,
                ssl: 'https',
                ipAddress: 'localhost',
                port: '3001'
            });
        }));

        it('Should cancelled event emit with expected values', () => {
            spyOn(component.cancelled, 'emit');
            cancelButton.triggerEventHandler('click', undefined);
            expect(component.cancelled.emit).toHaveBeenCalledWith();
        });
    });

    function sendInput(...inputs: InputValue[]): Promise<any> {
        inputs.forEach((input: InputValue) => {
            input.element.nativeElement.value = input.value;
            input.element.nativeElement.dispatchEvent(new Event('input'));
        });

        fixture.detectChanges();
        return fixture.whenStable();
    }
});

interface InputValue {
    element: DebugElement;
    value: string;
}
