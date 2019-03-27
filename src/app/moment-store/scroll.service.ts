import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ScrollService {
  scrollSubject : BehaviorSubject < any >;
  constructor() {
    this.scrollSubject = new BehaviorSubject(null);
  }

  notify(event) {
    this
      .scrollSubject
      .next(event);
  }

  scrollupdates() {
    return this
      .scrollSubject
      .asObservable();
  }
}
