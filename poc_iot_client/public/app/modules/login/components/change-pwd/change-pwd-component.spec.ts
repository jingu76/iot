import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { I18NModule } from './../../../i18n/i18n-module';
import { loginBundle as enBundle } from './../../res/bundle.en';
import { ChangePwdComponent } from './change-pwd-component';

describe('Test change-pwd-component.ts', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                BrowserAnimationsModule,
                I18NModule.provideBundles({ en: enBundle })
            ],
            declarations: [
                ChangePwdComponent
            ]
        }).compileComponents();
    }));

    let fixture: ComponentFixture<ChangePwdComponent>;
    let component: ChangePwdComponent;
    let newPwdField: DebugElement;
    let confirmedPwdField: DebugElement;
    let changeButton: DebugElement;
    let cancelButton: DebugElement;
    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePwdComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        newPwdField = fixture.debugElement.query(By.css('input[formcontrolname="newPassword"]'));
        confirmedPwdField = fixture.debugElement.query(By.css('input[formcontrolname="confirmPassword"]'));
        changeButton = fixture.debugElement.query(By.css('button[name="change"]'));
        cancelButton = fixture.debugElement.query(By.css('button[name="cancel"]'));
    });

    afterEach(() => {
        newPwdField = undefined;
        confirmedPwdField = undefined;
        changeButton = undefined;
        cancelButton = undefined;
        fixture = undefined;
        component = undefined;
    });

    describe('#Input Action', () => {

        beforeEach(() => {
            component.pending = false;
        });

        it('Should disable change button no fields input', (done) => {
            sendInput(
                { element: newPwdField, value: '' },
                { element: confirmedPwdField, value: '' }
            ).then(() => {
                expect(changeButton.nativeElement.disabled).toBeTruthy();
                expect(cancelButton.nativeElement.disabled).toBeTruthy();
                done();
            }).catch(() => {
                fail('input value failed.');
                done();
            });
        });

        it('Should disable change button only new password input', (done) => {
            sendInput(
                { element: newPwdField, value: 'Nemuadmin' },
                { element: confirmedPwdField, value: '' }
            ).then(() => {
                expect(changeButton.nativeElement.disabled).toBeTruthy();
                expect(cancelButton.nativeElement.disabled).toBeTruthy();
                done();
            }).catch(() => {
                fail('input value failed.');
                done();
            });
        });

        it('Should disable change button only confirm password input', (done) => {
            sendInput(
                { element: newPwdField, value: '' },
                { element: confirmedPwdField, value: 'nemuuser' }
            ).then(() => {
                expect(changeButton.nativeElement.disabled).toBeTruthy();
                expect(cancelButton.nativeElement.disabled).toBeTruthy();
                done();
            }).catch(() => {
                fail('input value failed.');
                done();
            });
        });

        it('Should enable change button all fields input', (done) => {
            sendInput(
                { element: newPwdField, value: 'Nemuadmin' },
                { element: confirmedPwdField, value: 'nemuuser' }
            ).then(() => {
                expect(changeButton.nativeElement.disabled).toBeFalsy();
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
                { element: newPwdField, value: 'nemuuser' },
                { element: confirmedPwdField, value: 'nemuuser' }
            ).then(done).catch(done);
        });

        it('Should disable input fields when pending is true', () => {
            component.pending = true;
            fixture.detectChanges();
            expect(newPwdField.nativeElement.disabled).toBeTruthy();
            expect(confirmedPwdField.nativeElement.disabled).toBeTruthy();
            expect(changeButton.nativeElement.disabled).toBeTruthy();
            expect(cancelButton.nativeElement.disabled).toBeFalsy();
        });

        it('Should enable input fields when pending is false', () => {
            component.pending = false;
            fixture.detectChanges();
            expect(newPwdField.nativeElement.disabled).toBeFalsy();
            expect(confirmedPwdField.nativeElement.disabled).toBeFalsy();
            expect(changeButton.nativeElement.disabled).toBeFalsy();
            expect(cancelButton.nativeElement.disabled).toBeTruthy();
        });
    });

    describe('#toggleRules', () => {
        let rulesDiv: DebugElement;
        let originalTimeout: number;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        beforeEach(() => {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
            rulesDiv = fixture.debugElement.query(By.css('div[name="rules"]'));
        });
        afterEach(() => {
            rulesDiv = undefined;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

        it('Should show password rules', (done) => {
            component.showRules = true;
            fixture.detectChanges();
            fixture.whenRenderingDone().then(() => {
                expect(rulesDiv.nativeElement.style.height).toBe('248px');
                done();
            }).catch(() => {
                fail('show password failed.');
                done();
            });
        });

        it('Should hide password rules', (done) => {
            component.showRules = false;
            fixture.detectChanges();
            fixture.whenRenderingDone().then(() => {
                expect(rulesDiv.nativeElement.style.height).toBe('0px');
                done();
            }).catch(() => {
                fail('hide password failed.');
                done();
            });
        });
    });

    describe('#Change #Cancel', () => {

        beforeEach((done) => {
            sendInput(
                { element: newPwdField, value: 'nemuuser' },
                { element: confirmedPwdField, value: 'nemuuser' }
            ).then(done).catch(done);
        });

        it('Should submittted event emit with expected values', fakeAsync(() => {
            spyOn(component.submitted, 'emit');
            changeButton.nativeElement.click();
            fixture.detectChanges();
            tick();
            expect(component.submitted.emit).toHaveBeenCalledWith({
                newPassword: 'nemuuser',
                confirmPassword: 'nemuuser'
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
