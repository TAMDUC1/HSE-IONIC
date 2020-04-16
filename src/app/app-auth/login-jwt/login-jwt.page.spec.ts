import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginJwtPage } from './login-jwt.page';

describe('LoginJwtPage', () => {
  let component: LoginJwtPage;
  let fixture: ComponentFixture<LoginJwtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginJwtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginJwtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
