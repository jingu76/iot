import { I18NService } from './i18n-service';
import { I18NPipe } from './i18n-pipe';
describe('Test i18n-pipe.ts', () => {

    const key: string = 'bundle.key';
    let i18nService: I18NService;

    it('Should fetch the bundle value from i18n service', () => {
        i18nService = jasmine.createSpyObj('I18NService', ['translate']);
        let i18nPipe: I18NPipe = new I18NPipe(i18nService);
        i18nPipe.transform(key);
        expect(i18nService.translate).toHaveBeenCalledWith(key, undefined);
    });

    it('Should format the bundle value with params', () => {
        let params = ['aaaa', 'bbbb', 'cccc'];
        i18nService = jasmine.createSpyObj('I18NService', ['translate']);
        let i18nPipe: I18NPipe = new I18NPipe(i18nService);
        i18nPipe.transform(key, params);
        expect(i18nService.translate).toHaveBeenCalledWith(key, params);
    });
});