import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {GoogleSignIn} from '../configs/googlesignin.config'
@Injectable()
export class GooglesigninService {

	constructor(private http : Http) { }
	getgooglesign(id_token) {
		return this.http.get(GoogleSignIn.googleApiId+id_token)
		.map(data => data.text(),
			(error: any)=>console.log("error in getting data from database"));
	}
}
