import { TypeUtils } from './../type/type-utils';

export class JSONUtils {
    public static mergeDeep(target: any, source: any): any {
        let output = Object.assign({}, target);
        if (this.isNotArrayObject(target) && this.isNotArrayObject(source)) {
            Object.keys(source).forEach((key: any) => {
                if (this.isNotArrayObject(source[key]) && (key in target)) {
                    output[key] = this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }

    private static isNotArrayObject(item: any): boolean {
        return TypeUtils.isObject(item) && !Array.isArray(item);
    }
}