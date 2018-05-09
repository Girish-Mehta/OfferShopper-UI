import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';
import { Product } from '../../configs/product.config';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
  providers:[SearchService, UserService,LocationService]
})
export class ShopPageComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private searchService : SearchService,
    private userService : UserService,
    private locationService: LocationService
    ) { }

  private vendorsByCity = [];
  private category: string = "";
  private searchKey: string = "";
  //results retrieved from searching
  private results : any = [];  
  private filteredResults : any = [];
  
  ngOnInit() {   
    this.route.paramMap.subscribe(params => {
      this.category = params.get('id1');
      this.searchKey = params.get('id2');
      this.getVendors(localStorage.getItem("loc"));
      this.locationService.location.subscribe(loc => this.getVendors(loc));
      this.loadOffers();
    });
  }

  //to be loaded when it is routed to this component
  loadOffers() {
     //no results shown
     if(this.category=="All" && this.searchKey == "") {
       alert("Please select a category or search for a deal.");
     }

  // category based search
  else if(this.category == "All" && this.searchKey != "") {
    this.searchService.searchProducts(this.searchKey)
    .subscribe(res => {
      this.results = res;
      this.filteredResults = this.results;
    });
  }  

  else if(this.category != "All" && this.searchKey == "") {
    this.searchService.searchProductsCategoryOnly(this.category)
    .subscribe(res => {
      this.results = res;
      this.filteredResults = this.results;
    });
  }
  //search by both category and key
  else {
    this.searchService.searchProductsCategoryAndKey(this.category, this.searchKey)
    .subscribe(res => {
      this.results = res;
      this.filteredResults = this.results;
    });
    
  }
}

  //function for chosing on which basis to sort from
  sortBy(x) {
    switch (x) {
      case "priceLH":
      this.filteredResults.sort(this.sorters.byPrice);
      break;

      case "priceHL":
      this.filteredResults.sort(this.sorters.byPrice);
      this.filteredResults.reverse();
      break;

      case "discountLH":
      this.filteredResults.sort(this.sorters.byDiscount);
      break;

      case "discountHL":
      this.filteredResults.sort(this.sorters.byDiscount);
      this.filteredResults.reverse();
      break;
    }
  }

 //sorting 
 sorters = {
   byPrice: function(firstProduct, secondProduct) {
      //sorting on basis of discounted price
      return ((firstProduct.originalPrice)- (firstProduct.discount*firstProduct.originalPrice)/100) - ((secondProduct.originalPrice)- (secondProduct.discount*secondProduct.originalPrice)/100);
    },
    byDiscount: function(firstProduct, secondProduct) {
      return firstProduct.discount - secondProduct.discount;
    }
  };

  //whenever filter is changed
  onFinish(event) {
    this.filteredResults = this.results.filter((results)=> results.discount > event.from && results.discount < event.to);
  }

  //get vendors on basis of location - currently hardcoded to gurgaon
  getVendors(loc){
    this.userService.getVendorByCity(loc).subscribe(
      (res)=>{
        this.vendorsByCity = res
      },(error) =>{
        this.vendorsByCity=null;
      });
  }

}