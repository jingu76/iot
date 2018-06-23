import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from './../../../../config';
import * as superagent from 'superagent';

@Injectable()
export class CommunicationService {

    private isBrowserDirectlyToREST = false;
    private REMOTE_URL = 'http://'+config.network.restservip+':'+config.network.restservport;
    private LOCALHOST_URL = 'http://'+config.network.uiservip+':'+config.network.uiservport;

    private errors = {
        '0': `success`,
        '1': `System fail`,
        '2': `POST action id expected`,
        '3': `PUT action is expected`,
        '4': `Invalid body`,
        '303': `need login to access`,
        '304': `login fail, wrong username or password`,
        '401': `Invalid control message format`,
        '402': `Fail to control vehicle`,
        '403': `Wrong control command`,
        '404': `Wrong stop id`,
        '405': `fail to get log status`,
        '406': `fail to select target`,
        '407': `fail to cancel route`,
        '408': `too near from stop`
    }

    public login(username: string, password: string) {
        return this.postRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/sessions/`,
            { username: username, password: password });
    }

    public logout() {
        return this.deleteRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/sessions/`,
            {});
    }

    public controlModeChangeToManual(vin: string) {
        return this.putRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/controls/${vin}/`,
            { command: 'start_rctrl', parameters: {} });
    }

    public controlModeChangeToAuto(vin: string) {
        return this.putRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/controls/${vin}/`,
            { command: 'stop_rctrl', parameters: {} });
    }

    public startVehicle(vin: string) {
        return this.putRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/controls/${vin}/`,
            { command: 'start', parameters: {} });
    }

    public pauseVehicle(vin: string) {
        return this.putRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/controls/${vin}/`,
            { command: 'pause', parameters: {} });
    }

    public resumeVehicle(vin: string) {
        return this.putRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/controls/${vin}/`,
            { command: 'resume', parameters: {} });
    }

    public setMap(vin: string, mapId: string) {
        return this.postRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/vehicles/${vin}/maps/`,
            { map: mapId });
    }

    public selectLine(vin: string, lineId: string) {
        return this.putRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/controls/${vin}/`,
            { command: 'select_line', parameters: { line: lineId } });
    }

    public cancelRoute(vin: string) {
        return this.putRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/controls/${vin}/`,
            { command: 'cancel_route', parameters: {} });
    }

    public selectStop(vin: string, mapid: string, lineid: string, stopid: string) {
        return this.putRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/controls/${vin}/`, {
                command: 'select_stop', parameters: {
                    map: mapid,
                    line: lineid,
                    stop: stopid
                }
            });
    }

    public getVehicleInformation() {
        return this.getRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/vehicles/`, {});
    }

    public getTracking(vin: string) {
        return this.getRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/trackings/${vin}/`, {});
    }

    public getRoute(vin: string) {
        return this.getRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/routes/${vin}/`, {});
    }

    public getMap(mapId: string) {
        return this.getRequestToServer(
            `${this.isBrowserDirectlyToREST ? this.REMOTE_URL : this.LOCALHOST_URL}/maps/${mapId}/`, {});

    }

    public getRequestToServer(url, body) {
        return new Promise((resolve, reject) => {
            this.setRequestHeaderAndBodyAndSend(resolve, reject, url, body, superagent.get);
        });
    }

    public deleteRequestToServer(url, body) {
        return new Promise((resolve, reject) => {
            this.setRequestHeaderAndBodyAndSend(resolve, reject, url, body, superagent.del);
        });
    }

    public postRequestToServer(url, body) {
        return new Promise((resolve, reject) => {
            this.setRequestHeaderAndBodyAndSend(resolve, reject, url, body, superagent.post);
        });
    }

    public putRequestToServer(url, body) {
        return new Promise((resolve, reject) => {
            this.setRequestHeaderAndBodyAndSend(resolve, reject, url, body, superagent.put);
        });
    }

    public setRequestHeaderAndBodyAndSend(resolve, reject, url, body, rest) {
        return rest.call(superagent, url)
            .set('Content-Type', 'application/json')
            .send(body)
            .withCredentials()
            .then((result) => {
                // this.printLog(url, result);
                resolve(this.pauseResponseVehicleInfo(result));
            }).catch((err) => {
                reject(err);
            });
    }

    public pauseResponseVehicleInfo(response: any) {
        let responseVehicleInfo;
        if (response && response.text && response.text) {
            try {
                let responseObj = JSON.parse(response.text);
                if (responseObj && responseObj.text) {
                    responseVehicleInfo = JSON.parse(responseObj.text);
                }
            } catch (err) {
                console.log(`pauseResponseVehicleInfo -> ${err}`);
            }
        }
        return responseVehicleInfo;
    }

    public printLog(url, result) {
        try {
            console.log(`${url} -> ${JSON.stringify(result)}`);
        }
        catch (err) {
            console.log(`${url} -> ${err}`);
        }
    }
}