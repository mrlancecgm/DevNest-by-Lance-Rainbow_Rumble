import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RumblerAvatarComponent } from './rumbler-avatar.component';

describe('RumblerAvatarComponent', () => {
  let component: RumblerAvatarComponent;
  let fixture: ComponentFixture<RumblerAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RumblerAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RumblerAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
