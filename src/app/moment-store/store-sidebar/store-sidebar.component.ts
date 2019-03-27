import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

@Component({selector: 'app-store-sidebar', templateUrl: './store-sidebar.component.html', styleUrls: ['./store-sidebar.component.css']})
export class StoreSidebarComponent implements OnInit {

  public searchControl : FormControl;
  constructor(public route : ActivatedRoute, private router : Router) {
    this.searchControl = new FormControl('');
  }

  ngOnInit() {}

  onEnter(value) {
    let query = value;
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
