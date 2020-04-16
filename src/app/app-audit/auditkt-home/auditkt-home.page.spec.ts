import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditktHomePage } from './auditkt-home.page';

describe('AuditktHomePage', () => {
  let component: AuditktHomePage;
  let fixture: ComponentFixture<AuditktHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditktHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditktHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
