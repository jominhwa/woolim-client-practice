import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteDetailComponent } from './vote-detail.component';

describe('VoteDetailComponent', () => {
  let component: VoteDetailComponent;
  let fixture: ComponentFixture<VoteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VoteDetailComponent]
    });
    fixture = TestBed.createComponent(VoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
