export class CarInformation {

    private _name: string;
    private _vin: string;
    private _attached_map: string;
    private _attached_line: string;
    private _availability: string;
    private _condition: string;

    constructor(name: string, vin: string, attached_map: string,
        attached_line: string, availability: string, condition: string) {
        this._name = name;
        this._vin = vin;
        this._attached_map = attached_map;
        this._attached_line = attached_line;
        this._availability = availability;
        this._condition = condition;
    }

    get name() {
        return this._name;
    }

    get vin() {
        return this._vin;
    }

    get attached_map() {
        return this._attached_map;
    }

    get attached_line() {
        return this._attached_line;
    }

    get availability() {
        return this._availability;
    }

    get condition() {
        return this._condition;
    }

}