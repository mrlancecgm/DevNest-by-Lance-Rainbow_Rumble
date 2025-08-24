import { Component, ElementRef, ViewChild } from '@angular/core';
import { clearAppData, isNullOrEmpty, uploadRallyQuestions } from '../../../shared/functions/functions';

@Component({
  selector: 'app-rumbler-avatar',
  standalone: false,
  templateUrl: './rumbler-avatar.component.html',
  styleUrl: './rumbler-avatar.component.scss'
})
export class RumblerAvatarComponent {
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
      avatar: null
    },
    {
      id: 2,
      name: null,
      code: 'rumblerTwo',
      isActive: false,
      score: 0,
      tile_owned: null,
      avatar: null
    },
    {
      id: 3,
      name: null,
      code: 'rumblerThree',
      isActive: false,
      score: 0,
      tile_owned: null,
      avatar: null
    },
    {
      id: 4,
      name: null,
      code: 'rumblerFour',
      isActive: false,
      score: 0,
      tile_owned: null,
      avatar: null
    },
    {
      id: 5,
      name: null,
      code: 'rumblerFive',
      isActive: false,
      score: 0,
      tile_owned: null,
      avatar: null
    },
  ];

  public avatarChoices:any[]=[
    { id: 1, path: 'assets/avatars/red_man.png' },
    { id: 2, path: 'assets/avatars/blue_man.png' },
    { id: 3, path: 'assets/avatars/yellow_man.png' },
    { id: 4, path: 'assets/avatars/blue_man.png' },
    { id: 5, path: 'assets/avatars/green_man.png' },
    { id: 6, path: 'assets/avatars/pink_man.png' },
    { id: 7, path: 'assets/avatars/red_girl.png' },
    { id: 8, path: 'assets/avatars/blue_girl.png' },
    { id: 9, path: 'assets/avatars/yellow_girl.png' },
    { id: 10, path: 'assets/avatars/blue_girl.png' },
    { id: 11, path: 'assets/avatars/green_girl.png' },
    { id: 12, path: 'assets/avatars/pink_girl.png' },
  ]

  public hasActiveBox: boolean = false;
  public selectedRumblerName: string = '';
  public isReadyToRumble: boolean = false;
  public selectedCode!: string;

  @ViewChild('rumblerName') rumblerName!: ElementRef;

  ngOnInit(): void {
    const rumblerInfo = localStorage.getItem("rumblerInfo");
    if(rumblerInfo){
      this.rumblerInfo = JSON.parse(rumblerInfo);
    }
  }

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
    this.focusInput();
  }

  // ngAfterViewInit() {
  //   clearAppData();
  // }

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
    this.focusInput();
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

  focusInput(){
    setTimeout(() => {
      const input = document.getElementById('rumbler-name');
      if(input){
        input.focus();
      }
    })
  }

  ngDoCheck() {
    const nullName = this.rumblerInfo.find(
      (r: any) => isNullOrEmpty(r.name)
    );
    this.isReadyToRumble = nullName ? false : true;
  }
}
