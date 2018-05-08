import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { AuthorizationService } from '../../../../services/authorization.service';
import { TranslateService } from '@ngx-translate/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
	providers:[ AuthorizationService ]
})

export class NavbarComponent implements OnInit {

	private login:boolean = false;
	private token:any;
	private userId: string = "";
	private user: string = "";
	private url: string;

	@Input() userLocation:string;

	constructor(
		private router: Router,
		private authorizationService: AuthorizationService,
		private location:Location,
		private loginService: LoginService
		) {
		router.events.subscribe((data:any) => { 
			if(data.url) {
				this.url = (data.url.split('/'))[1];
			}
		});
	}


	ngOnInit() {
		this.isLogin();
	}

	isLogin(){
		if(localStorage.getItem("application-token")){
			console.log("Success");
			this.login = true;
		} else{
			this.login = false;
		}
		this.loginService.isLoggedin.subscribe(status => {
			this.login = status;
			this.getUserId();
		});
		this.getUserId();
	}

	logout(){
		this.authorizationService.logout();
		this.isLogin();
		this.loginService.logout();
	}

	getUserId() {
		this.authorizationService.getUserId().subscribe((res:any) =>{
			this.userId = (res.text().split(','))[2];
			if(this.userId) 
				this.user = (this.userId.split('@'))[0];			
		}, (error) =>{
		})
	}

	loadUserprofile(){
		this.isLogin();
		this.router.navigate(['/user/userdetails']);
	}
}
