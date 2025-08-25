import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  clearAppData,
  isNullOrEmpty,
  uploadRallyQuestions,
} from '../../../shared/functions/functions';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-rumbler-avatar',
  standalone: false,
  templateUrl: './rumbler-avatar.component.html',
  styleUrl: './rumbler-avatar.component.scss',
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
      avatar: null,
    },
    {
      id: 2,
      name: null,
      code: 'rumblerTwo',
      isActive: false,
      score: 0,
      tile_owned: null,
      avatar: null,
    },
    {
      id: 3,
      name: null,
      code: 'rumblerThree',
      isActive: false,
      score: 0,
      tile_owned: null,
      avatar: null,
    },
    {
      id: 4,
      name: null,
      code: 'rumblerFour',
      isActive: false,
      score: 0,
      tile_owned: null,
      avatar: null,
    },
    {
      id: 5,
      name: null,
      code: 'rumblerFive',
      isActive: false,
      score: 0,
      tile_owned: null,
      avatar: null,
    },
  ];

  public avatarChoices: any[] = [
    {
      id: 1,
      path: 'assets/avatars/red_man.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 2,
      path: 'assets/avatars/blue_man.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 3,
      path: 'assets/avatars/yellow_man.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 4,
      path: 'assets/avatars/purple_man.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 5,
      path: 'assets/avatars/green_man.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 6,
      path: 'assets/avatars/pink_man.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 7,
      path: 'assets/avatars/red_girl.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 8,
      path: 'assets/avatars/blue_girl.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 9,
      path: 'assets/avatars/yellow_girl.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 10,
      path: 'assets/avatars/purple_girl.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 11,
      path: 'assets/avatars/green_girl.png',
      isSelected: false,
      isAssigned: false,
    },
    {
      id: 12,
      path: 'assets/avatars/pink_girl.png',
      isSelected: false,
      isAssigned: false,
    },
  ];

  public hasActiveBox: boolean = false;
  public selectedRumbler: any;
  public isReadyToRumble: boolean = false;
  public selectedCode!: string;
  public selectedAvatar: any;

  @ViewChild('rumblerName') rumblerName!: ElementRef;

  ngOnInit(): void {
    const rumblerInfo = localStorage.getItem('rumblerInfo');
    if (rumblerInfo) {
      this.rumblerInfo = JSON.parse(rumblerInfo);
      this.rumblerInfo = this.rumblerInfo.map((r: any) => {
        r.isActive = false;
        return r;
      });
      this.saveToLocalStorage();
    }
  }

  assignAvatar(avatarPath: string) {
    const rumbler = this.rumblerInfo.find(
      (r: any) => r.code == this.selectedRumbler['code']
    );
    if (rumbler) {
      rumbler.avatar = avatarPath;
      const avatar = this.avatarChoices.find((a: any) => a.path == avatarPath);
      avatar.isAssigned = true;
    }
    this.saveToLocalStorage();
    this.getNextRumbler();
  }

  removeAvatar(avatarPath: string) {
    const rumbler = this.rumblerInfo.find(
      (r: any) => r.code == this.selectedRumbler['code']
    );
    if (rumbler) {
      rumbler.avatar = null;
      const avatar = this.avatarChoices.find((a: any) => a.path == avatarPath);
      avatar.isAssigned = false;
      this.saveToLocalStorage();
    }
  }

  selectAvatar(avatarId: number) {
    console.log('Avatar ID: ', avatarId);
    this.selectedAvatar = this.avatarChoices.find((s: any) => s.id == avatarId);
    this.avatarChoices = this.avatarChoices.map((a: any) => {
      a.isSelected = a.id == avatarId ? true : false;
      return a;
    });
  }

  chooseRumbler(rumblerCode: string) {
    feather.replace();
    console.log('Rumbler Code: ', rumblerCode);
    this.selectedRumbler = this.rumblerInfo.find(
      (r: any) => r.code == rumblerCode
    );
    this.selectedCode = rumblerCode;
    this.rumblerInfo = this.rumblerInfo.map((r: any) => {
      r.isActive = r.code == rumblerCode ? true : false;
      return r;
    });
    feather.replace();
  }

  getNextRumbler() {
    const rumbler = this.rumblerInfo.find(
      (r: any) => r.code == this.selectedCode
    );
    console.log('Rumbler: ', rumbler);
    if (rumbler) {
      const id = rumbler['id'];
      if (id < 5) {
        const nextRumbler = this.rumblerInfo.find((r: any) => r.id == id + 1);
        console.log('Next rumbler: ', nextRumbler);
        if (nextRumbler) {
          this.selectedRumbler = nextRumbler;
          this.selectedCode = nextRumbler.code;
          this.rumblerInfo = this.rumblerInfo.map((r: any) => {
            r.isActive = r.code != nextRumbler.code ? false : true;
            return r;
          });
          console.log('Rumbler Info: ', this.rumblerInfo);
        }
      }
    }
  }

  ngAfterViewInit() {
    feather.replace();
  }

  ngDoCheck() {
    const nullAvatar = this.rumblerInfo.find((r: any) =>
      isNullOrEmpty(r.avatar)
    );
    this.isReadyToRumble = nullAvatar ? false : true;
  }

  saveToLocalStorage() {
    localStorage.setItem('rumblerInfo', JSON.stringify(this.rumblerInfo));
  }
}
