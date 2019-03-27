import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentBundleComponent } from './moment-bundle.component';

describe('MomentBundleComponent', () => {
  let component: MomentBundleComponent;
  let fixture: ComponentFixture<MomentBundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentBundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
