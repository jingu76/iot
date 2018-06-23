import { Component, Input,Output,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { MapInfo, Stop, Line, Route } from './models';
import { SessionService } from './../../shared/service/session/session-service';
import { CommunicationService } from './../../shared/service/communication/communication-service';
import {
    MdSnackBar,
    MdSnackBarConfig,
    Dir,
} from '@angular/material';
import { Option } from './../map-view/models';

@Component({
    selector: 'map-form',
    templateUrl: './map-form-component.html',
    styleUrls: ['./map-form-component.scss']
})

export class MapFormComponent implements OnChanges{
  private carinfo: { name: string, vin: string, attached_map: string, attached_line: string, availability: string, condition: string };
  private maps: MapInfo[] = [];
  private lines: Line[] = [];
  private stops: Stop[] = [];
  private map: MapInfo;
  private line: Line;
  private stop: Stop;
  private submitted: boolean;
  private mapInfo: {map ?:MapInfo, route ?: Route, cancelRe ?: boolean} = {};
  private carLocation: any;
  private submitButtonDisable = false;
  private cancelButtonDisable = false;

  private option: Option = { scaleFactor: 2, width: 1000, height: 1000, inside: true };
  //Snack bar
  private actionButtonLabel: string = 'Retry';
  private action: boolean = false;
  private setAutoHide: boolean = true;
  private autoHide: number = 10000;
  private addExtraClass: boolean = false;

  @Input() carInfo;
  @Input() carLoc;
  @Output() output: EventEmitter<object> = new EventEmitter<object> ();

  constructor(private session: SessionService, private communicationService: CommunicationService,
    public snackBar: MdSnackBar, private dir: Dir) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.carInfo !== undefined && changes.carInfo.currentValue !==undefined){
      this.carinfo = changes.carInfo.currentValue;
      this.getMapInfo(this.carinfo.attached_map, this.carinfo.attached_line);
    }else if(changes.carLoc !== undefined && changes.carLoc.currentValue !== undefined){
      this.carLocation = changes.carLoc.currentValue;
    }
  }

  getMapInfo(mapId: string, lineId: string){
    this.communicationService.getMap(mapId).then((info:any)=>{
      if(Array.isArray(info.stops)){
        this.mapInfo.map = info;
        this.maps = Array.of(info);
        this.lines = info.lines;
        this.stops = info.stops.filter((stop)=> stop.lines.includes(lineId));
        this.map = info;
        this.line = info.lines.find(line => line.id === this.carinfo.attached_line);
        this.communicationService.getRoute(this.carinfo.vin).then((route: any) => {
          if(route.current_route) {
            this.stop = info.stops.find(stop => stop.id === route.current_route.stop);
            this.mapInfo.route = route.current_route;
          }
        })
      }
    });
  }

  getRoute(vin: string, mapid: string, lineid: string, stopid: string){
    this.communicationService.selectStop(vin, mapid, lineid, stopid).then((res:any) => {
      if(res.error_code === 0){
        this.mapInfo.route = res.response.current_route;
      }else {
        this.open(res.error_msg);
      }
    }, (res)=>{
      this.open(res.message);
    }) 
  }

  private closeForm() {
      this.mapInfo.cancelRe = true;
      this.output.emit(this.mapInfo);
      this.mapInfo.cancelRe = false;
  }

  private open(message: string) {
    let config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    config.extraClasses = this.addExtraClass ? ['party'] : undefined;
    config.direction = this.dir.value;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  onMapChange( map:any ) {
    if( this.line && this.stop){
      this.getRoute(this.carinfo.vin, map.value.id, this.line.id, this.stop.id);
    }
  }

  onLineChange( line:any ) {
    this.stops = this.map.stops.filter((stop)=> {return stop.lines.indexOf(line.value.id) !== -1});
    if( this.map && this.stop){
      this.getRoute(this.carinfo.vin, this.map.id, line.value.id, this.stop.id);
    }
  }

  onStopChange( stop:any ) {
    if( this.map && this.line ){
      this.getRoute(this.carinfo.vin, this.map.id, this.line.id, stop.value.id);
    }
  }

  onStopSelected( stop ) {
    if (stop) {
      this.stop = stop;
    }
    if( this.map && this.line ){
      this.getRoute(this.carinfo.vin, this.map.id, this.line.id, stop.id);
    }
  }
}