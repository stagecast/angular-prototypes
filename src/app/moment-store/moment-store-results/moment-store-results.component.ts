import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MockApiService} from '../mock-api.service';
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({selector: 'app-moment-store-results', templateUrl: './moment-store-results.component.html', styleUrls: ['./moment-store-results.component.css']})
export class MomentStoreResultsComponent implements OnInit {
  public searchResults$ : Observable < any >;
  public labelsMap : any;
  public searchQuery : string;
  public category : string;
  public type : string;
  public resultType : string;
  constructor(private api : MockApiService, private route : ActivatedRoute) {
    this.labelsMap = {
      'new': 'green',
      'free': 'purple',
      'premium': 'yellow'
    }
    this.resultType = 'search';
  }

  ngOnInit() {

    this
      .route
      .queryParamMap
      .subscribe(params => {
        this.searchQuery = params.get('query');
        this.category = params.get('category');
        this.type = params.get('type');

        if (this.searchQuery) {
          this.resultType = 'search';
        }
        if (this.category) {
          this.resultType = 'category';
        }
        if (this.type) {
          this.resultType = this.type;
        }

        this.searchResults$ = this
          .api
          .search({query: this.searchQuery, category: this.category, type: this.type})
          .pipe(tap(list => console.log(list)))
      })

  }

}
