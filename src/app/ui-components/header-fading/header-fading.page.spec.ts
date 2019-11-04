import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFadingPage } from './header-fading.page';

describe('HeaderFadingPage', () => {
  let component: HeaderFadingPage;
  let fixture: ComponentFixture<HeaderFadingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFadingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
