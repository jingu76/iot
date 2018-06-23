import { I18NService } from './i18n-service';
describe('Test i18n-service.ts', () => {

    const firstBundle: any = {
        en: {
            level1: 'Level 1',
            level2: {
                level2: 'Level 2 {0} {1} {0}',
                level3: {
                    level3: 'Level 3'
                }
            }
        },
        zh: {
            level1: '层次 1',
            level2: {
                level2: '层次 2 {0} {1} {0}',
                level3: {
                    level3: '层次 3'
                }
            }
        }
    };

    const secondBundle: any = {
        en: {
            level1: 'New Level 1',
            level2: {
                level3: {
                    level3: 'New Level 3'
                }
            },
            other: 'other node'
        },
        zh: {
            level1: '新层次 1',
            level2: {
                level3: {
                    level3: '新层次 3'
                }
            },
            other: '其他结点'
        }
    };

    const resultBunlde = {
        en: {
            level1: 'New Level 1',
            level2: {
                level2: 'Level 2 {0} {1} {0}',
                level3: {
                    level3: 'New Level 3'
                }
            },
            other: 'other node'
        },
        zh: {
            level1: '新层次 1',
            level2: {
                level2: '层次 2 {0} {1} {0}',
                level3: {
                    level3: '新层次 3'
                }
            },
            other: '其他结点'
        }
    };

    it('Should merge bundles resource after register', () => {
        let i18nService: any = new I18NService();
        i18nService.register(firstBundle);
        i18nService.register(secondBundle);
        expect(i18nService._bundles).toEqual(resultBunlde);
    });

    it('Should return correct localized value', () => {
        let i18nService: I18NService = new I18NService();
        i18nService.register(firstBundle);
        i18nService.register(secondBundle);

        i18nService.setLocale('en');
        expect(i18nService.translate('level1')).toBe('New Level 1');
        expect(i18nService.translate('level2.level2', [1, '2'])).toBe('Level 2 1 2 1');
        expect(i18nService.translate('level2.level3.level3')).toBe('New Level 3');
        i18nService.setLocale('zh');
        expect(i18nService.translate('level1')).toBe('新层次 1');
        expect(i18nService.translate('level2.level2', [1, '2'])).toBe('层次 2 1 2 1');
        expect(i18nService.translate('level2.level3.level3')).toBe('新层次 3');
    });

    it('Should return current locale value', () => {
        let i18nService: I18NService = new I18NService();
        expect(i18nService.getLocale()).toBe('en');
        i18nService.setLocale('zh');
        expect(i18nService.getLocale()).toBe('zh');
        i18nService.setLocale('en');
        expect(i18nService.getLocale()).toBe('en');
    });
});