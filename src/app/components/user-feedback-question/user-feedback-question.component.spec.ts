import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedbackQuestionComponent } from './user-feedback-question.component';

describe('UserFeedbackQuestionComponent', () => {
  let component: UserFeedbackQuestionComponent;
  let fixture: ComponentFixture<UserFeedbackQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFeedbackQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFeedbackQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
