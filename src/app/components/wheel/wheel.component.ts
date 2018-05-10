import { Component,OnInit } from '@angular/core';
import {OsCashService} from '../../services/os-cash.service';
import { AuthorizationService } from './../../services/authorization.service';
import { MessageService } from './../../services/message.service';
import { UserService } from './../../services/user.service';
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css'],
  providers:[OsCashService,AuthorizationService, MessageService]
})

export class WheelComponent implements OnInit{
  previousAngle : number;
  angle: number;
  obj={};
  sectorNo:number;
  public userInfo : any;
  public user : any;
  public osMoney:number;
  public cash=[20,8,3,0,5,0];

  constructor(
    private osCashService: OsCashService,
    private userdata:UserService,
    private authorizationService:AuthorizationService,
    private messageService: MessageService
    ) { }

  ngOnInit()
  {
    this.getUserId();
    this.previousAngle = 0;
  }

  getUserId() {
    this.authorizationService.getUserId().subscribe((res) =>{
      this.userInfo = res.text().split(',');
      this.user = this.userInfo[2];
      this. getProfile(this.user);
    }, (error) =>{
    })
  }

  getProfile(userId){
    this.userdata.getProfile(userId).subscribe((res) =>{
      this.osMoney=res.osCash;
    },(error) =>{
    })
  }

  spinWheel(){
    var object = document.getElementById("img1");
    var randomNumberBetween0and6 = Math.floor(Math.random() * 6);
    this.angle = (randomNumberBetween0and6*60)+(360*8)+this.previousAngle;
    object.style.transform = "rotate("+ this.angle+"deg)";
    this.sectorNo = ((this.angle )/60)%6;
    this.previousAngle = this.angle;
    this.submit();
  }

  submit(){
    this.osCashService.putOffer(this.cash[this.sectorNo],this.user).subscribe((res) =>{
    }, (res:Response) =>{
      if(res.status==400){
        setTimeout(()=>{
          this.messageService.showNoSpin();
        },3000)
      }
      else{
        setTimeout(()=>{
          this.messageService.showOsSpin(this.cash[this.sectorNo]);

        },3000)
      }
    });
  }

}
