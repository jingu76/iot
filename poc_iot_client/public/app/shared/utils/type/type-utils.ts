export class TypeUtils {

    static isArrayBuffer(object: any): boolean {
        // Second part of the condition is for code run outside of a browser (i.e. nashorn, node)
        // http://stackoverflow.com/questions/15251879/how-to-check-if-a-variable-is-a-typed-array-in-javascript
        return object instanceof ArrayBuffer || Object.prototype.toString.call(object) === '[object ArrayBuffer]';
    }

    static isObject(object: any): boolean {
        return Object(object) === object;
    }
}