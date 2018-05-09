import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../../../services/search.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers:[SearchService]
})
export class SearchBarComponent implements OnInit {

  public query : string = "";
  public category : string = "";
  public results:any=[];
  flag :boolean;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {
    if(this.searchTerm$){
      this.searchService.search(this.searchTerm$)
      .subscribe(res => {
        this.results = res;
        if(res!="default")
        {
          this.flag=true;
        }
        else{
          this.flag=false;
        }
      });
    }
  }

  ngOnInit() {
    this.category="All";
  }

  //Function shows the search result when enter pressed
  enterPressed(event) {
    if(event.keyCode == 13)
      document.getElementById("searchButton").click();
  }
}
