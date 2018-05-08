import { Component,OnInit } from '@angular/core';
import {OsCashService} from '../../services/os-cash.service';
import { AuthorizationService } from './../../services/authorization.service';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css'],
  providers:[OsCashService,AuthorizationService]

})
export class WheelComponent implements OnInit{
  previousAngle : number;
  angle: number;
  obj={};
  sectorNo:number;
  public userInfo : any;
  public user : any;
  public cash=[10,20,30,40,50,60];

  constructor(private osCashService: OsCashService,
    private authorizationService:AuthorizationService) { }

  ngOnInit()
  { this.getUserId();
    this.previousAngle = 25;
  }


  getUserId() {
    this.authorizationService.getUserId().subscribe((res) =>{
      this.userInfo = res.text().split(',');
      this.user = this.userInfo[2];
    }, (error) =>{
    })
  }
  spinWheel(){
    console.log(this.angle);
    var object = document.getElementById("img1");    
    var randomNumberBetween0and6 = Math.floor(Math.random() * 6);
    this.angle = (randomNumberBetween0and6*60)+(360*8)+this.previousAngle;
    //this.angle=60+this.previousAngle;
    console.log("new angle "+ this.angle);
    console.log("------------------------------------------------------");
    object.style.transform = "rotate("+ this.angle+"deg)";
    this.sectorNo = ((this.angle - 25)/60)%6;
    console.log("sector no "+ this.sectorNo);
    this.previousAngle = this.angle;
    this.submit();
  }

  submit(){

      console.log("i  am vish");
      console.log(this.cash[this.sectorNo]);
     this.osCashService.putOffer(this.cash[this.sectorNo],this.user).subscribe((res) =>{
      console.log("i  am respone");
      }, (error) =>{
        console.log("i  am error");
      })

  }




}
