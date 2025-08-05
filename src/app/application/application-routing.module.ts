import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RumbleSetupComponent } from './rumble-setup/rumble-setup.component';
import { RumbleProperComponent } from './rumble-proper/rumble-proper.component';
import { ColorDieComponent } from './color-die/color-die.component';

const routes: Routes = [
  {
    path: 'main-menu',
    component: MainMenuComponent
  },
  {
    path: 'rumble-setup',
    component: RumbleSetupComponent
  },
  {
    path: 'rumble-proper',
    component: RumbleProperComponent
  },
  {
    path: 'color-die',
    component: ColorDieComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
