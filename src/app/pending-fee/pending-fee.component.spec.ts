import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFeeComponent } from './pending-fee.component';

describe('PendingFeeComponent', () => {
  let component: PendingFeeComponent;
  let fixture: ComponentFixture<PendingFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
