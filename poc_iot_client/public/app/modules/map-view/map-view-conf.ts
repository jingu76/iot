export class MapViewConf {
    static DEFAULT_WIDTH: number = 1000;
    static DEFAULT_HEIGHT: number = 1000;

    WIDTH: number;
    HEIGHT: number;
    CLIENT_WIDTH: number;
    CLIENT_HEIGHT: number;

    static DEFAULT_SCALE_FACTOR: number = 2;
    scaleFactor: number;

    // stop properties
    STOP_IMG_PATH: string = "/img/map_station.png";
    stopImg: HTMLImageElement;
    stopRect = 80;

    stopNameFontSize: number = 20;
    stopNameStyle: string = "#212121";

    // car properties
    CAR_IMG_PATH: string = "/img/map_vehicle.png";
    carImg: HTMLImageElement;
    carPointRadius: number = 10;
    carPointStyle: string = "#F44336";
    useCarPoint: boolean = false;

    // route path
    ROUTE_START_IMG_PATH: string = "/img/map_route_start.png";
    ROUTE_END_IMG_PATH: string = "/img/map_route_end.png";
    routeStartImg: HTMLImageElement;
    routeEndImg: HTMLImageElement;  
    routeWidth: number = 5;
    routeStyle: string = "#448AFF";

    mapImg: HTMLImageElement;

    indicateLineStyle: string = "#757575";
    indicateLineWidth: number = 1;

    inside: boolean = false;
    offsetX: number = 0;
    offsetY: number = 0;

    toCanvasX(x:number)
    {
        return x * (this.WIDTH - 2 * this.offsetX) + this.offsetX;
    }

    toCanvasY(y:number)
    {
        return y * (this.HEIGHT - 2 * this.offsetY ) + this.offsetY;
    }
    
    loadImage( path: string ): Promise<HTMLImageElement> {
        return new Promise( resolve => {
            let img = new Image();
            img.src = path;
            img.onload = () => {
                resolve(img);
            };  
        } );

    }

    getStationImg(): Promise<HTMLImageElement> {
        if ( !this.stopImg ) {
            return this.loadImage(this.STOP_IMG_PATH).then( img => this.stopImg = img );
        } else {
            return Promise.resolve(this.stopImg);
        }
    }

    getCarImg(): Promise<HTMLImageElement> {
        if ( !this.carImg ) {
            return this.loadImage(this.CAR_IMG_PATH).then( img => this.carImg = img );
        } else {
            return Promise.resolve(this.carImg);
        }
    }

    getRouteStartImg(): Promise<HTMLImageElement> {
        if ( !this.routeStartImg ) {
            return this.loadImage(this.ROUTE_START_IMG_PATH).then( img => this.routeStartImg = img );
        } else {
            return Promise.resolve(this.routeStartImg);
        }
    }

    getRouteEndImg(): Promise<HTMLImageElement> {
        if ( !this.routeEndImg ) {
            return this.loadImage(this.ROUTE_END_IMG_PATH).then( img => this.routeEndImg = img );
        } else {
            return Promise.resolve(this.routeEndImg);
        }
    }
    
    getMapImg( url: string ): Promise<HTMLImageElement> {
        if ( !this.mapImg ) {
            return this.loadImage(url).then(img => this.mapImg = img);
        } else  {
            return Promise.resolve(this.mapImg);
        }
    }

    clamp( val: number, min: number, max: number): number {
        return Math.min(Math.max(min, val), max)
    }
}