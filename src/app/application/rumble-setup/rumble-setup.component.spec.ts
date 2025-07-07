import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RumbleSetupComponent } from './rumble-setup.component';

describe('RumbleSetupComponent', () => {
  let component: RumbleSetupComponent;
  let fixture: ComponentFixture<RumbleSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RumbleSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RumbleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
