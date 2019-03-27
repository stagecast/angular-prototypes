import {Component, OnInit} from '@angular/core';
import {MockApiService} from '../mock-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Component({selector: 'app-moment-bundle', templateUrl: './moment-bundle.component.html', styleUrls: ['./moment-bundle.component.css']})
export class MomentBundleComponent implements OnInit {

  public bundle$ : any;
  private bid : string;
  public secureImgUrl;
  constructor(private router : Router, private route : ActivatedRoute, private api : MockApiService, public sanitizer : DomSanitizer) {
    this.bid = this.route.snapshot.params['bid'];
    console.log(this.bid);
  }

  ngOnInit() {
    this.bundle$ = this
      .api
      .getBundle(this.bid)
      .pipe(tap(item => console.log(item)), tap(item => this.secureImgUrl = this.sanitizer.bypassSecurityTrustStyle(`url('${item.img}')`)))
  }

}
