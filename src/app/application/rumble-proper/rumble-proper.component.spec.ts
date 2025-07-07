import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RumbleProperComponent } from './rumble-proper.component';

describe('RumbleProperComponent', () => {
  let component: RumbleProperComponent;
  let fixture: ComponentFixture<RumbleProperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RumbleProperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RumbleProperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
