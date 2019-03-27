import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTemplateCardComponent } from './store-template-card.component';

describe('StoreTemplateCardComponent', () => {
  let component: StoreTemplateCardComponent;
  let fixture: ComponentFixture<StoreTemplateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreTemplateCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
