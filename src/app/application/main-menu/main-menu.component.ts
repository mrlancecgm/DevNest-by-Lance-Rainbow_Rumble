import { Component } from '@angular/core';
import * as feather from 'feather-icons';
import { clearAppData, extractCsvsFromZip } from '../../../shared/functions/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  standalone: false,
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  public rainbowRumbleLogo: string =
    'assets/logo/rainbow-rumble-transparent.png';
  public backupQuestions:any;
  public backupRumblers:any;

  constructor(private router: Router){}

  loadSavedGame(key: string) {
    const modal = document.getElementById('loadSavedGameModal');
    if (modal) {
      if (key == 'open') {
        feather.replace();
        (modal as HTMLElement).style.display = 'flex';
        (modal as HTMLElement).style.backdropFilter = 'brightness(0.5)';
      } else if (key == 'submit') {
      } else if (key == 'close') {
        (modal as HTMLElement).style.display = 'none';
      }      
    }
  }

  ngAfterViewInit(){
    clearAppData();
    feather.replace();
  }

  handleZipUpload(event: Event) {
  extractCsvsFromZip(event).then(data => {
    console.log('Extracted CSV JSON data:', data);
    sessionStorage.setItem('loadExisting','true');
    this.router.navigate(['/application/rumble-proper']);
  }).catch(err => {
    console.error(err);
  });
}

}
