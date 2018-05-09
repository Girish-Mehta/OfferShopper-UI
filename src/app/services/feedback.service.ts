import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Feedback} from './../configs/feedback.config';

@Injectable()
export class FeedbackService {
	private header;
	options:RequestOptions;

	constructor(private http: Http) {
		this.header = new Headers();
		this.header.append('Authorization', localStorage.getItem("application-token"));
		this.options = new RequestOptions({headers: this.header}); 
	}

	getFeed(userId) {
		return this.http.get(Feedback.getFeedUrl+userId, this.options)
		.map(data => data.json(),
		(error: any)=>console.log("error in getting data from database"));
	}
}
