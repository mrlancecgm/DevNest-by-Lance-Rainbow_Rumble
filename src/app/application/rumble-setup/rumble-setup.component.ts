import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  clearAppData,
  isNullOrEmpty,
  uploadRallyQuestions,
} from '../../../shared/functions/functions';

@Component({
  selector: 'app-rumble-setup',
  standalone: false,
  templateUrl: './rumble-setup.component.html',
  styleUrl: './rumble-setup.component.scss',
})
export class RumbleSetupComponent implements OnInit {
  public rainbowRumbleLogo: string =
    'assets/logo/rainbow-rumble-transparent.png';
  public uploadIcon: string = 'assets/icons/upload_white.png';

  public uploadRallyQuestions = uploadRallyQuestions;

  public rumblerInfo: any[] = [
    {
      id: 1,
      name: null,
      code: 'rumblerOne',
      isActive: false,
      score: 0,
      tile_owned: null,
    },
    {
      id: 2,
      name: null,
      code: 'rumblerTwo',
      isActive: false,
      score: 0,
      tile_owned: null,
    },
    {
      id: 3,
      name: null,
      code: 'rumblerThree',
      isActive: false,
      score: 0,
      tile_owned: null,
    },
    {
      id: 4,
      name: null,
      code: 'rumblerFour',
      isActive: false,
      score: 0,
      tile_owned: null,
    },
    {
      id: 5,
      name: null,
      code: 'rumblerFive',
      isActive: false,
      score: 0,
      tile_owned: null,
    },
  ];

  public hasActiveBox: boolean = false;
  public selectedRumblerName: string = '';
  public isReadyToRumble: boolean = false;
  public selectedCode!: string;

  @ViewChild('rumblerName') rumblerName!: ElementRef;

  ngOnInit(): void {}

  configRumbler(code: string) {
    this.hasActiveBox = true;
    this.selectedCode = code;
    const activeBox = this.rumblerInfo.find(
      (r: any) => r.code == this.selectedCode
    );
    this.selectedRumblerName = activeBox.name ? activeBox.name : '';
    console.log('Selected: ', this.selectedCode);
    this.rumblerInfo.forEach((r: any) => {
      if (r.code != this.selectedCode) {
        r.isActive = false;
      } else {
        r.isActive = true;
      }
    });
  }

  ngAfterViewInit() {
    clearAppData();
  }

  submitName() {
    const name = this.rumblerName.nativeElement.value;
    console.log('Name: ', name);
    if(isNullOrEmpty(name)){
      return;
    }
    const activeBox = this.rumblerInfo.find((r: any) => r.isActive == true);
    console.log('Active Box: ', activeBox);
    activeBox.name = (name as string).toUpperCase();
    let stringInfo = JSON.stringify(this.rumblerInfo);
    localStorage.setItem('rumblerInfo', stringInfo);
    this.getNextRumbler();
  }

  getNextRumbler() {
    const rumbler = this.rumblerInfo.find(
      (r: any) => r.code == this.selectedCode
    );
    console.log("Rumbler: ", rumbler);
    if (rumbler) {
      const id = rumbler['id'];
      if (id < 5) {
        const nextRumbler = this.rumblerInfo.find((r: any) => r.id == id + 1);        
        console.log("Next rumbler: ", nextRumbler);
        if (nextRumbler) {
          this.selectedRumblerName = nextRumbler.name;
          this.selectedCode = nextRumbler.code;
          this.rumblerInfo.forEach((r: any) => {
            if (r.code != nextRumbler.code) {
              r.isActive = false;
            } else {
              r.isActive = true;
            }
          });
        }
      }
    }
  }

  ngDoCheck() {
    const nullName = this.rumblerInfo.find(
      (r: any) => isNullOrEmpty(r.name)
    );
    this.isReadyToRumble = nullName ? false : true;
  }
}
