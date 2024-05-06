import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAJobComponent } from './find-a-job.component';

describe('FindAJobComponent', () => {
  let component: FindAJobComponent;
  let fixture: ComponentFixture<FindAJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindAJobComponent]
    });
    fixture = TestBed.createComponent(FindAJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});