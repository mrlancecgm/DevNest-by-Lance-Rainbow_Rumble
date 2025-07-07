import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rainbow-rumble-app';

//   constructor(
//     @Inject(
//     DOCUMENT) private document: Document,
//     protected renderer: Renderer2
// ) {
//     this.renderer.setStyle(document.body, 'overflow', 'hidden');
// }

  ngAfterViewInit(){
    const screenH = window.innerHeight;
    document.documentElement.style.setProperty('--screenH',`${screenH-3 }px`);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const screenH = window.innerHeight;
    document.documentElement.style.setProperty('--screenH',`${screenH-3}px`);
  }
}
