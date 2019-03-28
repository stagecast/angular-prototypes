import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

@Component({selector: 'app-store-sidebar', templateUrl: './store-sidebar.component.html', styleUrls: ['./store-sidebar.component.css']})
export class StoreSidebarComponent implements OnInit {
  @Output()onSearch : EventEmitter < string > = new EventEmitter < string > (null);
  public searchControl : FormControl;
  constructor(public route : ActivatedRoute, private router : Router) {
    this.searchControl = new FormControl('');
  }

  ngOnInit() {}

  onEnter(value) {
    let query = value;
    this
      .onSearch
      .emit(value);
    if (!query) {
      this
        .router
        .navigate(['.'], {relativeTo: this.route});
      return;
    }
    this
      .searchControl
      .markAsPristine();

    this
      .router
      .navigate(['results'], {
        relativeTo: this.route,
        queryParams: {
          query
        }
      })
  }
}
