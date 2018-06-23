export class StringUtils {

    static format(str: string, params: any[]) {
        return params.reduce((result, param, i) => result.replace(new RegExp(`\\{${i}\\}`, 'gi'), param), str);
    }
}