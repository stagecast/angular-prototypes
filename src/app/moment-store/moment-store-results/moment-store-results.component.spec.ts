import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentStoreResultsComponent } from './moment-store-results.component';

describe('MomentStoreResultsComponent', () => {
  let component: MomentStoreResultsComponent;
  let fixture: ComponentFixture<MomentStoreResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentStoreResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentStoreResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
