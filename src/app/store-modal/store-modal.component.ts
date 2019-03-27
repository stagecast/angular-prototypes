import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ScrollService} from '../moment-store/scroll.service';

@Component({selector: 'app-store-modal', templateUrl: './store-modal.component.html', styleUrls: ['./store-modal.component.css']})
export class StoreModalComponent implements OnInit {

  @ViewChild('storeModal')storeModal : ElementRef;

  constructor(private route : ActivatedRoute, private router : Router, private scroll : ScrollService) {}

  ngOnInit() {}
  dismiss() {
    this
      .router
      .navigate([
        `./welcome`, {
          outlets: {
            modal: null
          }
        }
      ]);
  }

  onScroll($event) {
    this
      .scroll
      .notify($event);
  }

  onActivate(event : Event) {
    this
      .storeModal
      .nativeElement
      .scrollTo(0, 0);
  }
}
