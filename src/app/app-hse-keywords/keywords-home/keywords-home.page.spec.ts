import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsHomePage } from './keywords-home.page';

describe('KeywordsHomePage', () => {
  let component: KeywordsHomePage;
  let fixture: ComponentFixture<KeywordsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
