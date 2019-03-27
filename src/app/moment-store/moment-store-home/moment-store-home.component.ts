import {Component, OnInit} from '@angular/core';
import {MockApiService} from '../mock-api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({selector: 'app-moment-store-home', templateUrl: './moment-store-home.component.html', styleUrls: ['./moment-store-home.component.css']})
export class MomentStoreHomeComponent implements OnInit {
  public bundles$ : Observable < any >;
  public recentlyUsed$ : Observable < any >;
  public newIn$ : Observable < any >;

  public lablesMap : any;
  constructor(private api : MockApiService) {
    this.lablesMap = {
      'new': 'green',
      'free': 'purple',
      'premium': 'yellow'
    }
  }

  ngOnInit() {
    this.bundles$ = this
      .api
      .getBundles();

    this.recentlyUsed$ = this
      .api
      .getTemplates()
      .pipe(map(list => list.slice(0, 4)));

    this.newIn$ = this
      .api
      .getTemplates()
      .pipe(map(list => list.slice(10, 14)));
  }

}
