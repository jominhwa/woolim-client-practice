import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteEditComponent } from './vote-edit.component';

describe('VoteEditComponent', () => {
  let component: VoteEditComponent;
  let fixture: ComponentFixture<VoteEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VoteEditComponent]
    });
    fixture = TestBed.createComponent(VoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
