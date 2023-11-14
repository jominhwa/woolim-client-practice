import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingEditComponent } from './meeting-edit.component';

describe('MeetingEditComponent', () => {
  let component: MeetingEditComponent;
  let fixture: ComponentFixture<MeetingEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MeetingEditComponent]
    });
    fixture = TestBed.createComponent(MeetingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
