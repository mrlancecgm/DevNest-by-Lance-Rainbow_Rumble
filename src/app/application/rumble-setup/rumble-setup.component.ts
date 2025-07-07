import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { uploadRallyQuestions } from '../../../shared/functions/functions';

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
    },
    {
      id: 2,
      name: null,
      code: 'rumblerTwo',
      isActive: false,
      score: 0,
    },
    {
      id: 3,
      name: null,
      code: 'rumblerThree',
      isActive: false,
      score: 0,
    },
    {
      id: 4,
      name: null,
      code: 'rumblerFour',
      isActive: false,
      score: 0,
    },
    {
      id: 5,
      name: null,
      code: 'rumblerFive',
      isActive: false,
      score: 0,
    },
  ];

  public hasActiveBox: boolean = false;
  public selectedRumblerName: string = '';
  public isReadyToRumble: boolean = false;

  @ViewChild('rumblerName') rumblerName!: ElementRef;

  ngOnInit(): void {
    const rumblerInfo = localStorage.getItem('rumblerInfo');
    // if(!rumblerInfo){
    //   let stringInfo = JSON.stringify(this.rumblerInfo);
    //   localStorage.setItem('rumblerInfo',stringInfo);
    // }
  }

  configRumbler(event: any, code: string) {
    console.log('Event: ', event);
    this.hasActiveBox = true;
    const selectedCode = code;
    const activeBox = this.rumblerInfo.find((r: any) => r.code == selectedCode);
    this.selectedRumblerName = activeBox.name ? activeBox.name : '';
    console.log('Selected: ', selectedCode);
    this.rumblerInfo.forEach((r: any) => {
      if (r.code != selectedCode) {
        r.isActive = false;
      } else {
        r.isActive = true;
      }
    });
  }

  submitName() {
    const name = this.rumblerName.nativeElement.value;
    console.log('Name: ', name);
    const activeBox = this.rumblerInfo.find((r: any) => r.isActive == true);
    console.log('Active Box: ', activeBox);
    activeBox.name = (name as string).toUpperCase();
    let stringInfo = JSON.stringify(this.rumblerInfo);
    localStorage.setItem('rumblerInfo', stringInfo);
  }

  ngDoCheck() {
    const nullName = this.rumblerInfo.find(
      (r: any) => r.name == null || r.name == ''
    );
    this.isReadyToRumble = nullName ? false : true;
  }

  
}
  