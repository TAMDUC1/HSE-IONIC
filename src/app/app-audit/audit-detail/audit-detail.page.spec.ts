import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDetailPage } from './audit-detail.page';

describe('AuditDetailPage', () => {
  let component: AuditDetailPage;
  let fixture: ComponentFixture<AuditDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
