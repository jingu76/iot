import { Component, Input, Output, ViewChild, AfterViewInit, QueryList, EventEmitter,
    ElementRef, OnChanges, SimpleChanges, SimpleChange, HostListener, OnInit } from '@angular/core';

import { MapInfo, Stop, Line, CarLocation, Route, Option, Anchor } from './models';
import { MapViewConf } from './map-view-conf';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls:['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit, OnChanges, OnInit {
    @ViewChild("myCanvas") myCanvas: ElementRef;
    @Input() mapInfo: MapInfo;
    @Input() lineId: number;
    @Input() carLoc: CarLocation;
    @Input() route: Route;
    @Input() option: Option;

    @Output() onStopSelected: EventEmitter<Stop> = new EventEmitter();

    conf: MapViewConf = new MapViewConf();
    visibleStops: Stop[];
    anchor: Anchor = {x:0, y:0};

    stationImg: HTMLImageElement;

    constructor() {
        this.drawMap = this.drawMap.bind(this);
        this.drawCar = this.drawCar.bind(this);
        this.drawRoute = this.drawRoute.bind(this);
        this.drawStops = this.drawStops.bind(this);
        this.translateCanvas = this.translateCanvas.bind(this);
    }

    ngOnInit(): void {
        this.updateVisibleStops();
        this.conf.scaleFactor = (this.option && this.option.scaleFactor) || MapViewConf.DEFAULT_SCALE_FACTOR;
        this.conf.WIDTH = (this.option && this.option.width) || MapViewConf.DEFAULT_WIDTH;
        this.conf.HEIGHT = (this.option && this.option.height) || MapViewConf.DEFAULT_HEIGHT; 
        this.conf.useCarPoint = this.option && this.option.useCarPoint;
        this.conf.inside = this.option && this.option.inside;
    }

    ngAfterViewInit():void {

        let canvas = this.myCanvas.nativeElement;

        // fix canvas width/height
        canvas.width = this.conf.CLIENT_WIDTH = canvas.clientWidth;
        canvas.height = this.conf.CLIENT_HEIGHT = canvas.clientHeight;

        let ctx = canvas.getContext('2d');
        this.draw(ctx);
    }

    ngOnChanges(changes: SimpleChanges ): void {
        let redraw = false;
        if (changes.carLoc )
        {
            if (changes.carLoc.currentValue && !this.conf.inside ) {
                let x = this.conf.clamp(this.conf.toCanvasX(this.carLoc.lon) - this.conf.CLIENT_WIDTH / 2.0, 0, this.conf.WIDTH - this.conf.CLIENT_WIDTH);
                let y = this.conf.clamp(this.conf.toCanvasY(this.carLoc.lat) - this.conf.CLIENT_HEIGHT / 2.0, 0, this.conf.HEIGHT - this.conf.CLIENT_HEIGHT);
                this.anchor = {x, y};
            } else {
                this.anchor = {x:0, y:0};
            }        
            redraw = true;
        }

        if ( changes.lineId || changes.mapInfo || changes.route )
        {
            this.updateVisibleStops();
            redraw = true;
        }

        if ( redraw ) {
            this.draw();
        }
    }

    onMouseClick(event: MouseEvent): void {
        let mouseX = event.offsetX + this.anchor.x;
        let mouseY = event.offsetY + this.anchor.y;
        let width = this.conf.stopRect / this.conf.scaleFactor;

        let selectedStop  = this.visibleStops.find( (stop) => {
            let stopX = this.conf.toCanvasX( stop.x ) - width / 2;
            let stopY = this.conf.toCanvasY( stop.y ) - width / 2;
            
            return mouseX > stopX && mouseY > stopY && mouseX < stopX + width && mouseY < stopY + width;
        });
        
        if (selectedStop)
        {
            this.onStopSelected.emit(selectedStop);
        }
    }

    updateVisibleStops(): void {
        if ( this.lineId >= 0 && this.lineId < this.mapInfo.lines.length )
        {
            this.visibleStops = this.mapInfo.stops.filter( stop => stop.lines.indexOf(this.lineId) >= 0 );
        } else {
            this.visibleStops = [];
        }
    }

    draw( ctx ?: CanvasRenderingContext2D ): void {
        
        if ( !this.myCanvas )
        {
            // view is not prepared
            return;
        }

        if ( !ctx )
        {
           let canvas = this.myCanvas.nativeElement;
           ctx = canvas.getContext('2d'); 
        }

        new Promise((resolve) => {
            ctx.clearRect(0, 0, this.conf.WIDTH, this.conf.HEIGHT);
            resolve(ctx);
        }).then(this.translateCanvas).then(this.drawMap).then(this.drawRoute).then(this.drawStops).then(this.drawCar)
        .then( (ctx: CanvasRenderingContext2D) => {   
            // reset transform
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        });
    }

    translateCanvas ( ctx: CanvasRenderingContext2D ): Promise<CanvasRenderingContext2D> {
        if (this.anchor) {
            ctx.translate( -this.anchor.x, -this.anchor.y );
        }
        return Promise.resolve(ctx);
    }

    drawStops( ctx: CanvasRenderingContext2D ): Promise<CanvasRenderingContext2D> {
        
        return new Promise(resolve => {
            this.conf.getStationImg().then( img => {

                ctx.save();
                ctx.fillStyle = this.conf.stopNameStyle;
                let fontSize = Math.floor(this.conf.stopNameFontSize / this.conf.scaleFactor + 0.5);
                ctx.font = fontSize + "px";
                ctx.textAlign = "center";

                this.visibleStops.forEach( stop => {
                    let width = img.width / this.conf.scaleFactor;
                    let height = img.height / this.conf.scaleFactor;
                    let x = this.conf.toCanvasX(stop.x);
                    let y = this.conf.toCanvasY(stop.y);
                    ctx.drawImage(img, x - width / 2, y - height / 2, width, height);

                    ctx.fillText( stop.name, x, y + height / 2 );

                });

                ctx.beginPath();
                resolve(ctx);
            });
        });
    }

    drawCar (ctx: CanvasRenderingContext2D): Promise<CanvasRenderingContext2D>
    {
        if (this.carLoc) {
            return new Promise(resolve => {
                if (!this.conf.useCarPoint) {
                    this.conf.getCarImg().then( (img) => {
                        let width = img.width / this.conf.scaleFactor;
                        let height = img.height / this.conf.scaleFactor;
                        let x = this.conf.toCanvasX(this.carLoc.lon);
                        let y = this.conf.toCanvasY(this.carLoc.lat);

                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate( - this.carLoc.theta + Math.PI / 2);
                        ctx.drawImage(img, - width / 2.0 , - height / 2.0, width, height);
                        ctx.restore();

                        resolve(ctx);
                    });
                } else {
                    let x = this.conf.toCanvasX(this.carLoc.lon);
                    let y = this.conf.toCanvasY(this.carLoc.lat);
                    ctx.save();
                    ctx.beginPath();
                    ctx.fillStyle = this.conf.carPointStyle;
                    ctx.arc(x, y, this.conf.carPointRadius / (2* this.conf.scaleFactor), 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.restore();

                    resolve(ctx);
                }
            });
        }

        return Promise.resolve(ctx);
    }

    drawRoute( ctx: CanvasRenderingContext2D ):  Promise<CanvasRenderingContext2D> {
        if ( this.route && this.route.waypoints.length > 1 )
        {
            let points = this.route.waypoints.map( (p) => [ this.conf.toCanvasX(p[0]), this.conf.toCanvasY(p[1]) ]);

            // draw path
            ctx.save();
            ctx.strokeStyle = this.conf.routeStyle;
            ctx.lineWidth = this.conf.routeWidth / this.conf.scaleFactor;

            ctx.beginPath();
            ctx.moveTo(points[0][0], points[0][1]);
            for (let i = 1; i < points.length; i ++) {   
                ctx.lineTo(points[i][0], points[i][1]);
            }
            ctx.stroke();
            ctx.restore();

            // start and end points
            return new Promise(resolve => {
                Promise.all([this.conf.getRouteStartImg(), this.conf.getRouteEndImg()]).then( (imgs: HTMLImageElement[] ) => {
                    ctx.save();

                    let width = imgs[0].width / this.conf.scaleFactor;
                    let height  = imgs[0].height / this.conf.scaleFactor;
                    let x = points[0][0] - width / 2.0;
                    let y = points[0][1] - height + this.conf.routeWidth / (this.conf.scaleFactor * 2.0);
                    ctx.drawImage(imgs[0], x, y, width, height);

                    x = points[points.length - 1][0] - width / 2.0;
                    y = points[points.length - 1][1] - height + this.conf.routeWidth / (this.conf.scaleFactor * 2.0);

                    ctx.drawImage(imgs[1], x, y, width, height);

                    ctx.restore();
                    resolve(ctx);
                });
            });
        }
        return Promise.resolve(ctx);
    }

    drawMap( ctx: CanvasRenderingContext2D ): Promise<CanvasRenderingContext2D> {
        if ( this.mapInfo )
        {
            return new Promise(resolve => {
                this.conf.getMapImg(this.mapInfo.url).then(img => {
                    ctx.save();
                    let fw = img.width / this.conf.WIDTH;
                    let fh = img.height / this.conf.HEIGHT;

                    if ( this.conf.inside ) {
                        // calculate offsetX offsetY
                        let scaleVal = Math.max(fw, fh);
                        let width = img.width / scaleVal;
                        let height = img.height / scaleVal;
                        this.conf.offsetX = (this.conf.WIDTH - width) / 2.0;
                        this.conf.offsetY = (this.conf.HEIGHT - height) / 2.0;

                        ctx.drawImage(img, 0, 0, img.width, img.height, this.conf.offsetX, this.conf.offsetY, width, height);

                    } else {

                        ctx.drawImage(img, this.anchor.x * fw , this.anchor.y * fh,
                            this.conf.CLIENT_WIDTH * fw, this.conf.CLIENT_HEIGHT * fh, 
                            this.anchor.x, this.anchor.y, this.conf.CLIENT_WIDTH, this.conf.CLIENT_HEIGHT);
                    }
                    ctx.restore();
                    resolve(ctx);
                });
            });
        }
        return Promise.resolve(ctx);
    }

 }