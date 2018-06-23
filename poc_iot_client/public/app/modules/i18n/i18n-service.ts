import { StringUtils } from './../../shared/utils/string/string-utils';
import { JSONUtils } from './../../shared/utils/json/json-utils';

export class I18NService {
    private _locale: string = 'en';
    private _bundles: any = {};
    constructor() {
    }

    /**
     * @param bundles e.g. 
     * {
     *     'en': { test: { name: 'English name', } },
     *     'zh': { test: { name: '中文名' } }
     * }
     */
    public register(bundles: any): void {
        this._bundles = JSONUtils.mergeDeep(this._bundles, bundles);
    }

    public translate(key: string, params?: any[]): string {
        let bundle = this.get(key);
        return params && StringUtils.format(bundle, params) || bundle;
    }

    private get(key: string): string {
        let initValue: any = this._bundles[this._locale];
        return initValue && key.split('.').reduce((pre: string, key: string) => pre && pre[key], initValue) || key;
    }

    public setLocale(locale: string): void {
        this._locale = locale;
    }

    public getLocale(): string {
        return this._locale;
    }
}
