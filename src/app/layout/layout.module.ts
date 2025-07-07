import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BodyComponent, LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BodyComponent, LayoutComponent]
})
export class LayoutModule { }
