import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RallyQuestionComponent } from './rally-question.component';

describe('RallyQuestionComponent', () => {
  let component: RallyQuestionComponent;
  let fixture: ComponentFixture<RallyQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RallyQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RallyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
