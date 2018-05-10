import { Component, OnInit, EventEmitter } from '@angular/core';
import { Cities}  from '../../../configs/cities.config';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from "@angular/router";
import { LocationService } from "../../../services/location.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class HeaderComponent implements OnInit {

  private location: string;
  private mainUrl: string;
  cities = Cities.citiesName; 
  selected={a:"Delhi"};
  tempselected={a:"Gurgaon"}

  constructor(
    location: Location,
    private router: Router,
    private locationService: LocationService
    ) { }

  ngOnInit() {
    this.cities.sort(function(a,b){
      return a.localeCompare(b);
    });
  }

  //Function shows the favourite locations
  favouriteCity(tempselected){
    this.selected.a=tempselected.a;
    let value = tempselected.a;
    localStorage.setItem("loc",tempselected.a);
    this.locationService.updateLocation();
    this.location = location.pathname;
    this.mainUrl = (this.location.split('/'))[1];
    if(this.mainUrl=="homepage")
      this.router.navigate(['/',this.mainUrl,tempselected.a]);
  }

  //Function sets the city name
  setCity(city){
    this.selected.a=city;
    let value = city;
    this.tempselected.a=city;
    localStorage.setItem("loc",city);
    this.location = location.pathname;
    this.mainUrl = (this.location.split('/'))[1];
    if(this.mainUrl=="homepage")
      this.router.navigate(['/',this.mainUrl,city]);

  }

  getLocation(event) {
    this.location = event;
  }
}
