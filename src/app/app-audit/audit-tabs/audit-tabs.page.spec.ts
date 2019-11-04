import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditTabsPage } from './audit-tabs.page';

describe('AuditTabsPage', () => {
  let component: AuditTabsPage;
  let fixture: ComponentFixture<AuditTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
