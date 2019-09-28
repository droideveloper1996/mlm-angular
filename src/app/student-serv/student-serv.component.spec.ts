import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentServComponent } from './student-serv.component';

describe('StudentServComponent', () => {
  let component: StudentServComponent;
  let fixture: ComponentFixture<StudentServComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentServComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
