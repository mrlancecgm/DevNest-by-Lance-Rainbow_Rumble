import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDieComponent } from './color-die.component';

describe('ColorDieComponent', () => {
  let component: ColorDieComponent;
  let fixture: ComponentFixture<ColorDieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorDieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorDieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
