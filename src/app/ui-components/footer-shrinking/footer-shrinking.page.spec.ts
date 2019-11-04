import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterShrinkingPage } from './footer-shrinking.page';

describe('FooterShrinkingPage', () => {
  let component: FooterShrinkingPage;
  let fixture: ComponentFixture<FooterShrinkingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterShrinkingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterShrinkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
