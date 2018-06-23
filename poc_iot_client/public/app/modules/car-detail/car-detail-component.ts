import { VideoComponent } from './../video/video-component';
import { Component, Input, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { CarInformation } from '../../shared/service/carinformation';
import { SessionService } from './../../shared/service/session/session-service';
import { CommunicationService } from './../../shared/service/communication/communication-service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/observable';
import { carDetailBundle } from './res/bundle.en';
import { config } from './../../../config';
import { MapFormComponent } from './../map-form/map-form-component';
import { Option } from './../map-view/models';

import {
    MdSnackBar,
    MdSnackBarConfig,
    Dir,
} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
@Component({
    selector: 'car-detail',
    templateUrl: './car-detail-component.html',
    styleUrls: ['./car-detail-component.scss']
})
export class CarDetailComponent {

    @Input() carinfo: { name?: string, vin?: string, attached_map?: string, attached_line?: string, availability?: string, condition?: string };
    @Input() mapActive;
    @ViewChildren(VideoComponent) videos: QueryList<VideoComponent>;

    private intervalTime = 1000;
    private sub;
    private speed;
    private battery;
    //Video
    private auto: boolean = true;
    private stopped: boolean = true;
    private paused: boolean = true;
    private hidefront: boolean = true;
    private w: any;
    private conf: any;
    private interval: any;
    //Snack bar. 
    private actionButtonLabel: string = 'Retry';
    private action: boolean = false;
    private setAutoHide: boolean = true;
    private autoHide: number = 4000;
    private addExtraClass: boolean = false;
    //Control Buttons 
    private isAutoSwithDisabled = false;
    private isStartSwithDisabled = false;
    private isPauseSwithDisabled = false;
    private isMapDisabled = false;

    private frontviewtext="";
    private rearviewtext="";
    private leftviewtext="";
    private rightviewtext="";
    private innerviewtext="";

    private manual_text = carDetailBundle.carDetail.manual_text;
    private auto_text  = carDetailBundle.carDetail.auto_text;
    private cancel_text = carDetailBundle.carDetail.cancel_text;
    private start_text = carDetailBundle.carDetail.start_text;
    private pause_text = carDetailBundle.carDetail.pause_text;
    private resume_text = carDetailBundle.carDetail.resume_text;
    private Menuvehiclename = carDetailBundle.carDetail.Menuvehiclename;
    private map_button_text = carDetailBundle.carDetail.map_button_text;

    private carSpeed: string="";
    private carDrivingMode: string="";
    private carCondition: string="";
    private carAvailability: string="";
    private carTheta: string="";    

    //map component
    private mapInfo: {map ?: object, route ?: object, cancelRe ?: boolean} = {};
    private carLoc: any;

    private mapOption: Option = { scaleFactor: 3, width: 500, height: 500, useCarPoint: true, inside: false }; 

    constructor(private session: SessionService, private cdRef: ChangeDetectorRef,
        private communicationService: CommunicationService, public snackBar: MdSnackBar, private dir: Dir,
        private cookieService: CookieService) {
        this.w = window["Woogeen"];
        this.conf = this.w.ConferenceClient.create({});
    }

    mapClose(event:any){
        if(!event.cancelRe)
        {
            this.mapInfo.route = event.route;
            this.mapInfo.map = event.map;
        }
        this.mapActive=false;
    }

    onAutoClick(event: any) {
        this.isAutoSwithDisabled = true;
        if (!this.auto) {
            this.communicationService.controlModeChangeToAuto(this.carinfo.vin).then((vehiclesInfo: any) => {
                console.error("to auto!");
                if (vehiclesInfo) {
                    if (vehiclesInfo.error_msg === 'success') {
                        this.auto = !this.auto;
                        this.isStartSwithDisabled = false;
                        this.isPauseSwithDisabled = false;
                        this.isMapDisabled = false;
                    }
                    this.isAutoSwithDisabled = false;
                    this.open(vehiclesInfo.error_msg);
                }
            });
        }
        else {
            this.communicationService.controlModeChangeToManual(this.carinfo.vin).then((vehiclesInfo: any) => {
                console.error("to maual!");
                if (vehiclesInfo) {
                    if (vehiclesInfo.error_msg === 'success') {
                        this.auto = !this.auto;
                        this.isStartSwithDisabled = true;
                        this.isPauseSwithDisabled = true;
                        this.isMapDisabled = true;
                    }
                    this.isAutoSwithDisabled = false;
                    this.open(vehiclesInfo.error_msg);
                }
            });
        }
    }

    onStopClick(event: any) {
        this.isStartSwithDisabled = true;
        if (this.stopped) {
            this.communicationService.startVehicle(this.carinfo.vin).then((vehiclesInfo: any) => {
                if (vehiclesInfo) {
                    if (vehiclesInfo.error_msg === 'success') {
                        this.stopped = !this.stopped;
                        this.isPauseSwithDisabled = false;
                    }
                    this.open(vehiclesInfo.error_msg);
                    this.isStartSwithDisabled = false;
                }
            });
        }
        else {
            this.communicationService.pauseVehicle(this.carinfo.vin).then((vehiclesInfo: any) => {
                if (vehiclesInfo) {
                    if (vehiclesInfo.error_msg === 'success') {
                        this.communicationService.cancelRoute(this.carinfo.vin).then((res: any) => {
                            if (res) {
                                if(res.error_msg === 'success') {
                                    this.stopped = !this.stopped;
                                    this.isPauseSwithDisabled = true;
                                }
                                this.open(res.error_msg);
                            }
                        })
                    }
                    else {
                        this.open(vehiclesInfo.error_msg);
                    }
                }
                this.isStartSwithDisabled = false;
            });
        }
    }

    onPauseClick(event: any) {
        this.isPauseSwithDisabled = true;
        if (this.paused) {
            this.communicationService.resumeVehicle(this.carinfo.vin).then((vehiclesInfo: any) =>{
                if(vehiclesInfo) {
                    if( vehiclesInfo.error_msg === 'success') {
                        this.paused = ! this.paused;
                    }
                    this.open(vehiclesInfo.error_msg);
                }
                this.isPauseSwithDisabled =false;
            });
        }
        else {
            this.communicationService.pauseVehicle(this.carinfo.vin).then((vehiclesInfo: any) =>{
                if(vehiclesInfo) {
                    if( vehiclesInfo.error_msg === 'success') {
                        this.paused = ! this.paused;
                    }
                    this.open(vehiclesInfo.error_msg);
                }
                this.isPauseSwithDisabled =false;
            });
        }
    }

    getNativeElement(type: string): any {
        var vc = this.videos.toArray().find((vc: VideoComponent) => {
            return vc.position === type;
        });
        if (vc) {
            return vc.nativeElement;
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        for (var i in this.conf.remoteStreams) {
            if (this.conf.remoteStreams.hasOwnProperty(i)) {
                var stream = this.conf.remoteStreams[i];
                stream.close();
                if (stream.channel && typeof stream.channel.close === 'function') {
                    stream.channel.close();
                }
                delete this.conf.remoteStreams[i];
            }
        }
    }

    ngOnInit() {
        if(!this.session.getCurrentSelectCar() && !this.getCarinfoFromCookie('carInfo')){
            this.carinfo = this.session.getCurrentSelectCar();
        }
        this.carinfo = this.session.getCurrentSelectCar()? this.session.getCurrentSelectCar() : this.getCarinfoFromCookie('carInfo');
        //NOTICE: CURRENT SPEED ALWAYS 0 FROM THE SERVER, 2017.09.14
        this.sub = IntervalObservable
            .create(this.intervalTime).subscribe(() => {
                this.communicationService.getTracking(this.carinfo.vin).then((vehiclesInfo: any) => {
                    if (Array.isArray(vehiclesInfo.vehicles)) {
                        let trackingCar = vehiclesInfo.vehicles.find((vehicle) => {
                            return vehicle.vin === this.carinfo.vin;
                        });
                        if (trackingCar && trackingCar.data) {
                            //this.speed = trackingCar.data.speed;
                            this.speed = 15 + Math.round(Math.random() * 5);
                            this.battery = trackingCar.data.battery / 100;
                            this.carDrivingMode = trackingCar.data.driving_mode;
                            this.carAvailability = trackingCar.availability;
                            this.carCondition = trackingCar.condition;
                            this.carSpeed = trackingCar.data.speed;

                            var fSpeed = parseFloat(trackingCar.data.speed);
                            this.carSpeed = fSpeed.toFixed(2).toString();
                            this.carTheta = trackingCar.data.theta;
                            // this.auto = trackingCar.driving_mode !== 'manual';

                            if (trackingCar.condition === 'STOPPED'){
                                this.stopped = true;
                                this.paused = true;
                            }else if(trackingCar.condition === 'PAUSED'){
                                this.stopped = false;
                                this.paused = true;
                            }else if(trackingCar.condition === 'ARRIVED'){
                                this.stopped = true;
                                this.paused = false;
                                this.isPauseSwithDisabled = true;
                            }else if(trackingCar.condition === 'RUNNING'){
                                this.stopped = false;
                                this.paused = false;
                            }else{
                                // this.stopped = true;
                                // this.paused = false;
                                // this.isPauseSwithDisabled = true;
                                console.debug("./track no state");
                            }
                            //this.stopped = trackingCar.condition !== 'STOPPED';
                            if ( trackingCar.data.location )
                            {
                                this.carLoc = {lon: trackingCar.data.location.lon, lat: trackingCar.data.location.lat, theta: trackingCar.data.theta };
                              
                            }

                        }
                    }
                });
            });

        this.communicationService.getMap(this.carinfo.attached_map).then( map => {
            this.mapInfo.map = map;
        });

        this.communicationService.getRoute(this.carinfo.vin).then( (route: any) => {
            this.mapInfo.route = route.current_route;
        });

        this.conf.on('stream-added', (event) => {
            var stream = event.stream;
            var vin = stream.attr('vin');
            if (!(vin === this.carinfo.vin)){
                return;
            }
            this.trySubscribeStream(stream);
        });
        this.conf.on('stream-removed', (event) => {
            var stream = event.stream;
            var type = stream.attr('position');
            var vin = stream.attr('vin');
            if (!(vin === this.carinfo.vin)){
                return;
            }
            var id = stream.elementId !== undefined ? stream.elementId : 'test' +
                stream.id();
            if (id !== undefined) {
                var element = document.getElementById(id);
                if (element && this.getNativeElement(type)) {
                    this.getNativeElement(type).lastChild.removeChild(element);
                    if (type == 'front') {
                        this.hidefront = true;
                        this.frontviewtext = "";
                    }else{
                        switch(type)
                        {
                            case "rear":
                                this.rearviewtext = "";
                                break;
                            case "left":
                                this.leftviewtext = "";
                                break;
                            case "right":
                                this.rightviewtext = "";
                                break;
                            case "inner":
                                this.innerviewtext = "";
                                break;
                            default:
                                console.error("Wrong View comes! type=:" + type);
                        } 
                    }
                    this.getNativeElement(type).lastChild.innerHTML = " ";
                }
            }
        });
        this.createToken(undefined, 'user', 'presenter', (response) => {
            var token = response;
            this.conf.join(token, (resp) => {
                var streams = resp.streams;
                streams.map((stream) => {
                    this.trySubscribeStream(stream);
                });
            }, function (err) {
            });
        });
    }

    createToken(room, userName, role, callback) {
        var req = new XMLHttpRequest();
        var url = 'http://'+config.network.videoservip+':'+config.network.videoservport+'/createToken/';
        var body = {
            room: room,
            username: userName,
            role: role
        };
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                callback(req.responseText);
            }
        };
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(body));
    }


    displayStream(stream, resolution) {
        var type = stream.attr('position');
        if ((!this.getNativeElement(type) || !type)&& (!(type ==='sp'))) {
            //console.error("no component found for type " + type);
            return;
        }
        var streamId = stream.id();
        stream.disableAudio();
        if (type === 'front') {
            resolution = {
                width: 768,
                height: 576
            };
            this.hidefront = false;
            this.frontviewtext = carDetailBundle.carDetail.Frontviewtext;            
        } else if(type==='inner'){
            resolution = {
                width: 276,
                height: 207
            };
            this.innerviewtext = carDetailBundle.carDetail.Innerviewtext;
        } else if(type==='sp'){
            resolution = {
                width: 276,
                height:207
            };
            stream.enableAudio();            
            var nativestream = stream.mediaStream;
            var remoteVideo : any  = document.querySelector('#remoteSpVideo');      
            remoteVideo.src = window.URL.createObjectURL(nativestream); 
        }
        else {
            resolution = {
                width: 380,
                height: 285
            };
            switch(type)
            {
                case "rear":
                    this.rearviewtext = carDetailBundle.carDetail.Rearviewtext;
                    break;
                case "left":
                    this.leftviewtext = carDetailBundle.carDetail.Leftviewtext;
                    break;
                case "right":
                    this.rightviewtext = carDetailBundle.carDetail.Rightviewtext;
                    break;
                default:
                    console.error("Wrong View comes! type=:" + type);
            }         
            
        }

        var div = document.getElementById('test' + streamId);
        if (!div) {
            div = document.createElement('div');
            div.setAttribute('id', 'test' + streamId);
            div.setAttribute('title', 'Stream#' + streamId);
            this.getNativeElement(type).lastChild.innerHTML = "";
            this.getNativeElement(type).lastChild.appendChild(div);
        }
        div.setAttribute('style', 'width: ' + resolution.width + 'px; height: ' +
            resolution.height + 'px;');
        stream.show('test' + streamId);
    }

    trySubscribeStream(stream) {
        if (stream instanceof this.w.RemoteMixedStream) {
            stream.on('VideoLayoutChanged', () => {
            });
        } else {
            this.conf.subscribe(stream, () => {
                this.displayStream(stream, '');
            }, (err) => {
            });

        }
    }

    private open(message: string) {
        let config = new MdSnackBarConfig();
        config.duration = this.autoHide;
        config.extraClasses = this.addExtraClass ? ['party'] : undefined;
        config.direction = this.dir.value;
        this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
    }

    get autoOrManual() {
        return this.auto ? this.auto_text : this.manual_text;
    }

    get stopOrStart() {
        return this.stopped ? this.start_text : this.cancel_text;
    }

    get pauseOrResume() {
        return this.paused ? this.resume_text : this.pause_text;
    }

    getCarinfoFromCookie (key: string) {
        let info: any = this.cookieService.getObject(key);
        return new CarInformation(info._name, info._vin, info._attached_map, info._attached_line, info._availability, info._condition);
    }
}