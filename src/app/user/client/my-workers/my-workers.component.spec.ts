import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkersComponent } from './my-workers.component';

describe('MyWorkersComponent', () => {
  let component: MyWorkersComponent;
  let fixture: ComponentFixture<MyWorkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyWorkersComponent]
    });
    fixture = TestBed.createComponent(MyWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
