import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderShrinkingPage } from './header-shrinking.page';

describe('HeaderShrinkingPage', () => {
  let component: HeaderShrinkingPage;
  let fixture: ComponentFixture<HeaderShrinkingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderShrinkingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderShrinkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
