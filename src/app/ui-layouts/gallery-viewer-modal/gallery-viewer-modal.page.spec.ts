import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryViewerModalPage } from './gallery-viewer-modal.page';

describe('GalleryViewerModalPage', () => {
  let component: GalleryViewerModalPage;
  let fixture: ComponentFixture<GalleryViewerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryViewerModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryViewerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
