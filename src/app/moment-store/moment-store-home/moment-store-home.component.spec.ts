import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentStoreHomeComponent } from './moment-store-home.component';

describe('MomentStoreHomeComponent', () => {
  let component: MomentStoreHomeComponent;
  let fixture: ComponentFixture<MomentStoreHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentStoreHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentStoreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
