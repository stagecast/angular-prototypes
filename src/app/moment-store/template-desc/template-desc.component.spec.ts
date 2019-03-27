import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDescComponent } from './template-desc.component';

describe('TemplateDescComponent', () => {
  let component: TemplateDescComponent;
  let fixture: ComponentFixture<TemplateDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
