import { I18NService } from './i18n-service';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'i18n', pure: false })
export class I18NPipe implements PipeTransform {
    constructor(private _i18nService: I18NService) { }

    transform(key: string, params?: any[]): string {
        return this._i18nService.translate(key, params);
    }
}