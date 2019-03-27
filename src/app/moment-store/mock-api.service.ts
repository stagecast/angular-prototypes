import {Injectable} from '@angular/core';
import {bundles} from '../../assets/mock-data/bundles';
import {templates} from '../../assets/mock-data/templates';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MockApiService {

  constructor() {}

  getBundles() : Observable < any > {
    return of(bundles);
  }

  getBundle(bid : string) : Observable < any > {
    return of(bundles).pipe(map(list => list.find(value => value._id === bid)));
  }

  getTemplates() : Observable < any > {
    return of(templates);
  }
  getTemplate(tid : string) : Observable < any > {
    return of(templates).pipe(map(list => list.find(value => value.dashedName === tid)));
  }

  search(params : any) : Observable < any > {

    if(params.type) {
      return of(bundles);
    }

    if (params.category) {
      let cat = params
        .category
        .toLowerCase()
        .split('-')
        .join(' ');

      if (cat === 'all') {
        return of(templates);
      }

      return of(templates).pipe(map(list => list.reduce((acc : any[], value : any) => {
        for (var i = 0; i < value.categories.length; i++) {
          if (value.categories[i].toLowerCase() === cat) {
            acc.push(value);
          }
        }
        return acc;

      }, [])))
    }

    return of(templates).pipe(map(list => list.reduce((acc : any[], value : any) => {
      if (value.name.includes(params.query)) {
        acc.push(value);
      }
      return acc;

    }, [])))
  }
}
