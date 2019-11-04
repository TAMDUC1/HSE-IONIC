import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHideTitlePage } from './header-hide-title.page';

describe('HeaderHideTitlePage', () => {
  let component: HeaderHideTitlePage;
  let fixture: ComponentFixture<HeaderHideTitlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderHideTitlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderHideTitlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
