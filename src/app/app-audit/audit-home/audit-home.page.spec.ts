import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditHomePage } from './audit-home.page';

describe('AuditHomePage', () => {
  let component: AuditHomePage;
  let fixture: ComponentFixture<AuditHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
