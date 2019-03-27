import {Component, OnInit, Input} from '@angular/core';

@Component({selector: '[templateCard]', templateUrl: './store-template-card.component.html', styleUrls: ['./store-template-card.component.css']})
export class StoreTemplateCardComponent implements OnInit {
  @Input()template : any;
  @Input()urlTo : string;
  public lablesMap : any;

  constructor() {
    this.lablesMap = {
      'new': 'green',
      'free': 'purple',
      'premium': 'yellow'
    }
  }

  ngOnInit() {}

}
