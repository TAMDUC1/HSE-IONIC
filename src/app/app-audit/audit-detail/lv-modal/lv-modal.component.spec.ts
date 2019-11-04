import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LvModalComponent } from './lv-modal.component';

describe('LvModalComponent', () => {
  let component: LvModalComponent;
  let fixture: ComponentFixture<LvModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LvModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
