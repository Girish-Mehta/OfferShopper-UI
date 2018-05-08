import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { LocationService } from '../../../../services/location.service';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../../configs/language.config';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers:[LocationService]
})
export class LocationComponent implements OnInit {

  languages = Language.languages;
  private location: string;
  private mainUrl: string;
  
  constructor(
    private locationService: LocationService, 
    public translate: TranslateService,
    location: Location,
    private router: Router
    ) {

  //translation 
  translate.addLangs(this.languages);
  translate.setDefaultLang('en');

  const browserLang = translate.getBrowserLang();
  translate.use(this.languages.filter(languages => browserLang.match(languages)) ? browserLang : 'en');
}



@Input() obj={a:"Delhi"};
getlocation(){
  var varobj=this.obj;
  let locationService=this.locationService;
  let _router = this.router;
  let userMainUrl = (location.pathname.split('/'))[1];
  if (!navigator.geolocation){
    return;
  }  
  
  function error() {    
    if(userMainUrl == "homepage") {
      if(localStorage.getItem("loc"))
        _router.navigate(['/',userMainUrl,localStorage.getItem("loc")]);
      else
        _router.navigate(['/',userMainUrl,"Delhi"]);
    }
    console.log("User refused access to his location");
  }  
  function get(varobj){
    navigator.geolocation.getCurrentPosition((position)=>{
      var Latitude  = position.coords.latitude;
      var Longitude = position.coords.longitude;

      locationService.getLocation(position.coords.latitude, position.coords.longitude).subscribe((res) =>{

        console.log(res.results[0].formatted_address);
        var result = res.results[0].formatted_address.toString().split(",");
        var a = result.length;
        console.log(result[a-3]);
        if(result[a-3].trim()=="Gurugram".trim())
          varobj.a="Gurgaon";
        else
          varobj.a=result[a-3];
        console.log(Latitude+" "+Longitude+" "+varobj.a);
        localStorage.setItem("loc",varobj.a);
        if(userMainUrl == "homepage") {
          _router.navigate(['/',userMainUrl,varobj.a]);
        }
      }, (error) =>{ console.log("error")    
    })

    }, error);
  }
//function call to callback
get(varobj);

}


ngOnInit(){
  var value:String=localStorage.getItem("loc");
  if(value){
    if(value.trim()=="Gurugram".trim()) {
      this.obj.a="Gurgaon";
      this.homeResultRelatedToLocation(this.obj.a);
    }
    else {
      this.obj.a=value.trim();
      this.homeResultRelatedToLocation(this.obj.a); 
    }
  }
  else
    this.getlocation();
}

homeResultRelatedToLocation(userLocation) {
  this.location = location.pathname;
  this.mainUrl = (this.location.split('/'))[1];
  if(!this.mainUrl)
    this.router.navigate(['/homepage',userLocation]);
  if(this.mainUrl=="homepage")
    this.router.navigate(['/',this.mainUrl,userLocation]);
}

}

