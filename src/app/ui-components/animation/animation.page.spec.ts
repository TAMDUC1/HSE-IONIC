import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationPage } from './animation.page';

describe('AnimationPage', () => {
  let component: AnimationPage;
  let fixture: ComponentFixture<AnimationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
