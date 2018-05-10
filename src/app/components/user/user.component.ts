import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[ AuthorizationService ]
})
export class UserComponent implements OnInit {

  public userList;
  private login;
  private userInfo;
  public role;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorizationService: AuthorizationService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userList = params.get('id');
      this.isLogin();
    });
  }

  //Function will check that user is login or not
  isLogin(){
    this.login = this.authorizationService.isLogin();
    this.getUserId();
  }

  //Function will get the userId from token
  getUserId() {
    this.authorizationService.getUserId().subscribe((res) =>{
      this.userInfo = res.text().split(',');
      this.role = this.userInfo[1];
    }, (error) =>{
    })
  }

  //Function will change the sidebar if customer changes to vendor
  changeSidebarVender(event) {
    if(event) {
      this.getUserId();
      this.router.navigate(['/user/add-offer']);
    }
  }
}
