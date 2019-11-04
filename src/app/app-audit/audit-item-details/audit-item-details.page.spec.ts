import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditItemDetailsPage } from './audit-item-details.page';

describe('AuditItemDetailsPage', () => {
  let component: AuditItemDetailsPage;
  let fixture: ComponentFixture<AuditItemDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditItemDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditItemDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
