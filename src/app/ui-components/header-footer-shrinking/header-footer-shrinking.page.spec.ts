import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFooterShrinkingPage } from './header-footer-shrinking.page';

describe('HeaderFooterShrinkingPage', () => {
  let component: HeaderFooterShrinkingPage;
  let fixture: ComponentFixture<HeaderFooterShrinkingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFooterShrinkingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFooterShrinkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
