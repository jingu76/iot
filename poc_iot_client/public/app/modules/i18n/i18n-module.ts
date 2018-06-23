/**
 * Current I18NPipe implement by impure pipe.
 * 
 * Usage example:
 *  
 * Notice: Do not use "." inside of bundle key.
 * Sugguestion: keep bundle json in 2 level, group by module name.
 * 
 * --res/bundle.en.ts
 * export const bundle = {
 *    Example: {  //"Example" is module name.
 *        title: 'Example',
 *    }
 * };
 * 
 * --/res/bundle.zh.ts
 * export const bundle = {
 *    Example: {
 *        title: '例子',
 *    }
 * };
 * 
 * --example-module.ts
 * import { bundle as enBundle } from './res/bundle.en';
 * import { bundle as zhBundle } from './res/bundle.zh';
 * 
 * @NgModule({
 *   declarations: [ExampleComponent],
 *    imports: [I18NModule.provideBundles({ zh: zhBundle, en: enBundle })],
 *    exports: [ExampleComponent],
 *    providers: [],
 * })
 * export class ExampleModule {
 *    constructor() {
 *    }
 * }
 * 
 * use in html template
 * <h1>{{ "Example.title" | i18n }}</h1>
 * 
 */

import { NgModule, ModuleWithProviders, InjectionToken, Inject } from '@angular/core';
import { I18NService } from './i18n-service';
import { I18NPipe } from './i18n-pipe';

export const BUNDLES: InjectionToken<any> = new InjectionToken<any>('bunldes');
export const REGISTER: InjectionToken<any> = new InjectionToken<any>('register');

@NgModule({
    declarations: [
        I18NPipe,
    ],
    exports: [
        I18NPipe,
    ],
    providers: [I18NService]
})
export class I18NModule {

    constructor( @Inject(REGISTER) register: any) { }
    
    /**
     * Use this method in your other modules to register bundles
     * @param {any} bundles
     * @returns {ModuleWithProviders}
     */
    static provideBundles(bundles: any = {}): ModuleWithProviders {
        return {
            ngModule: I18NModule,
            providers: [
                {
                    provide: BUNDLES,
                    multi: true,
                    useValue: bundles
                },
                {
                    provide: REGISTER,
                    deps: [I18NService, BUNDLES],
                    useFactory: registerBundle
                }
            ]
        };
    }
}

export function registerBundle(i18NService: I18NService, bundles: any[]) {
    bundles.forEach((bundle) => i18NService.register(bundle));
}