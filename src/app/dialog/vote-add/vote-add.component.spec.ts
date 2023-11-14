import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteAddComponent } from './vote-add.component';

describe('VoteAddComponent', () => {
  let component: VoteAddComponent;
  let fixture: ComponentFixture<VoteAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VoteAddComponent]
    });
    fixture = TestBed.createComponent(VoteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
