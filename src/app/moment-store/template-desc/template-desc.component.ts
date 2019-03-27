import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';
import {ScrollService} from '../scroll.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MockApiService} from '../mock-api.service';
import {DomSanitizer} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';

@Component({selector: 'app-template-desc', templateUrl: './template-desc.component.html', styleUrls: ['./template-desc.component.css']})
export class TemplateDescComponent implements OnInit {
  @ViewChild('icon')icon : ElementRef;
  @ViewChild('templateDescription')templateDescription : ElementRef;
  @ViewChild('button')button : ElementRef;
  @ViewChild('title')title : ElementRef;
  @ViewChild('price')price : ElementRef;
  public template$ : any;
  private tid : string;
  public secureImgUrl;

  constructor(private router : Router, private route : ActivatedRoute, private api : MockApiService, public sanitizer : DomSanitizer, private scroll : ScrollService, private renderer : Renderer2) {
    this.tid = this.route.snapshot.params['tid'];
    console.log(this.tid);
  }

  ngOnInit() {
    this.template$ = this
      .api
      .getTemplate(this.tid)
      .pipe(tap(item => console.log(item)))
  }

  ngAfterViewInit() {
    // this   .scroll   .scrollupdates()   .subscribe((event) => {
    // this.onScroll(event);   })
  }
  onScroll(event) {
    console.log('scroll', event);
    // if (event && event.target.scrollTop > 40) {   this     .icon .nativeElement
    // .classList     .remove('icon-box-xl');   this     .icon  .nativeElement
    // .classList     .add('icon-box');   this     .title .nativeElement .classList
    // .remove('h1');   this     .title .nativeElement     .classList .add('h4');
    // this     .button .nativeElement     .classList .remove('btn-lg');   this
    // .button .nativeElement     .classList .add('btn-sm');   this
    // .templateDescription     .nativeElement     .classList     .add('d-none');
    // this     .price     .nativeElement     .classList .remove('h3');   this
    // .price     .nativeElement     .classList .add('h6'); }
  }
}
