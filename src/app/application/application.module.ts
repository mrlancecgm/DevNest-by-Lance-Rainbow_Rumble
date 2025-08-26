import { NgModule } from '@angular/core';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ApplicationRoutingModule } from "./application-routing.module";
import { RumbleSetupComponent } from './rumble-setup/rumble-setup.component';
import { FormsModule } from '@angular/forms';
import { RumbleProperComponent } from './rumble-proper/rumble-proper.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RallyQuestionComponent } from './rally-question/rally-question.component';
import { ColorDieComponent } from './color-die/color-die.component';
import { RumblerAvatarComponent } from './rumbler-avatar/rumbler-avatar.component';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MainMenuComponent,
    RumbleSetupComponent,
    RumbleProperComponent,
    RallyQuestionComponent,
    ColorDieComponent,
    RumblerAvatarComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    FormsModule
  ],
  providers: [DatePipe]
})
export class ApplicationModule { }
