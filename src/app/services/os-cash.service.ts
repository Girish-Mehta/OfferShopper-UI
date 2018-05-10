import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {WheelConfig} from '../configs/wheel.config';


@Injectable()
export class OsCashService {
	/*private headers = new Headers({ 'Content-Type': 'application/json'});*/
	 private header;
    options:RequestOptions;
  constructor(private http: Http) {      
        this.header = new Headers();
        //this.header.append('Authorization', localStorage.getItem("application-token"));
        this.options = new RequestOptions({headers: this.header}); }

  putOffer(obj:number,user){
   return this.http.put(WheelConfig.updateOsCashURL+obj+"/"+user, "")
    .map(data => data.json(),
  (error: any)=>console.log("error"));
 }

}