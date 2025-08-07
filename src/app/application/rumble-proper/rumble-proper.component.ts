import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  setTestabilityGetter,
  ViewEncapsulation,
} from '@angular/core';

import {
  convertToCSV,
  convertToCsv2,
  uploadRallyQuestions,
  csvToJson,
  arrayToJson,
  convertJsonToCsv,
  clearAppData,
} from '../../../shared/functions/functions';
import * as feather from 'feather-icons';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as fs from 'fs';
import { DatePipe } from '@angular/common';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { resolve } from 'path';

@Component({
  selector: 'app-rumble-proper',
  standalone: false,
  templateUrl: './rumble-proper.component.html',
  styleUrl: './rumble-proper.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RumbleProperComponent implements OnInit {
  public questions1_to_10: any[] = [];
  public questions11_to_20: any[] = [];
  public questions21_to_30: any[] = [];
  public questions31_to_40: any[] = [];
  public questions41_to_50: any[] = [];
  public hasCardPicked: boolean = false;
  public animateCard: boolean = false;
  public uploadLabel: string = 'Browse File';
  public uploadRallyQuestions = uploadRallyQuestions;
  public arrayToJson = arrayToJson;
  public convertToCsv = convertToCsv2;
  public csvToJson = csvToJson;
  public convertJsonToCsv = convertJsonToCsv;

  public interval: any;
  public count: number = 3;
  public startCountdown: boolean = false;

  public currentQuestion: any = {
    questionId: null,
    statement: null,
    isDone: null,
  };
  public questionConfig: any = {
    questionId: null,
    statement: null,
    isDone: null,
  };

  public selectedSetupCategory: string = 'upload';
  public questionToEdit: any = {
    id: null,
    text: null,
  };

  public allScoresAreZero: boolean = false;

  public rainbowRumbleLogo: string =
    'assets/logo/rainbow-rumble-transparent.png';
  public setupIcon: string = 'assets/icons/setup-icon.png';
  public fileBrowseIcon: string = 'assets/icons/file-browse.png';
  public saveIcon: string = 'assets/icons/save.png';
  public exitIcon: string = 'assets/icons/exit.png';
  public uploadInProgress: boolean = false;
  public uploadSuccessful: boolean = false;

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

  public color_tiles: any = {
    row_one: [{
      point: '+1',
      color: ['red','blue','green'],
      type: 'tri-color',
      isLuckyTile: false,
      owner: null
    }],
    row_two: [{
      point: 'x3',
      color: ['red','yellow','purple'],
      type: 'tri-color',
      isLuckyTile: false,
      owner: null
    },{
      point: 'x3',
      color: ['green','pink','blue'],
      type: 'tri-color',
      isLuckyTile: false,
      owner: null
    }],
    row_three: [{
      point: 'x2',
      color: ['green','purple'],
      type: 'dual-color',
      isLuckyTile: false,
      owner: null
    },{
      point: '+3',
      color: ['blue'],
      type: 'single-color',
      isLuckyTile: false,
      owner: null
    },{
      point: 'x2',
      color: ['red','yellow'],
      type: 'dual-color',
      isLuckyTile: false,
      owner: null
    }],
    row_four: [{
      point: '-1',
      color: ['blue'],
      type: 'single-color',
      isLuckyTile: false,
      owner: null
    },{
      point: '+3',
      color: ['yellow','purple'],
      type: 'dual-color',
      isLuckyTile: false,
      owner: null
    },{
      point: 'x2',
      color: ['red'],
      type: 'single-color',
      isLuckyTile: false,
      owner: null
    },{
      point: '+1',
      color: ['green','pink'],
      type: 'dual-color',
      isLuckyTile: false,
      owner: null
    }],
    row_five: [{
      point: '+1',
      color: ['yellow'],
      type: 'single-color',
      isLuckyTile: false,
      owner: null
    },{
      point: '+2',
      color: ['green'],
      type: 'single-color',
      isLuckyTile: false,
      owner: null
    },{
      point: '+1',
      color: ['pink'],
      type: 'single-color',
      isLuckyTile: false,
      owner: null
    },{
      point: '+2',
      color: ['purple'],
      type: 'single-color',
      isLuckyTile: false,
      owner: null
    },{
      point: '+1',
      color: ['red','blue'],
      type: 'dual-color',
      isLuckyTile: false,
      owner: null
    }]
  }

  public colorTilesArray = Object.values(this.color_tiles);

  cubeStyle: any = {};
  resultColor: string = '';

  private contextMenuHandler = (event: MouseEvent) => {
    event.preventDefault();
    this.stopRolling();
    this.startThreeSecondCountdown();
    console.log('Right-click detected on cube!');
  };

  faceTransforms = [
    { transform: 'rotateX(0deg) rotateY(0deg)', color: 'red' }, // front
    { transform: 'rotateY(180deg)', color: 'blue' }, // back
    { transform: 'rotateY(-90deg)', color: 'green' }, // right
    { transform: 'rotateY(90deg)', color: 'yellow' }, // left
    { transform: 'rotateX(-90deg)', color: 'pink' }, // top
    { transform: 'rotateX(90deg)', color: 'purple' }, // bottom
  ];

  constructor(private datePipe: DatePipe, private router: Router) {}

  ngOnInit(): void {
    const rumblerInfo = localStorage.getItem('rumblerInfo');
    if (rumblerInfo) {
      this.rumblerInfo = JSON.parse(rumblerInfo);
    }

    console.log("CTA: ", this.colorTilesArray);
  }

  questionInitialSetup(key: string) {
    console.log('Key: ', key);
    setTimeout(() => {
      const modal = document.getElementById('questionInitialSetupModal');

      if (modal) {
        console.log('modal');
        if (key == 'open') {
          (modal as HTMLElement).style.display = 'flex';
          (modal as HTMLElement).style.backdropFilter = 'brightness(0.5)';
        } else if (key == 'close') {
          (modal as HTMLElement).style.display = 'none';
        } else if (key == 'return') {
          console.log('return...');
          this.questionInitialSetup('close');
          clearAppData();
          this.router.navigate(['/application/main-menu']);
        }
      }
    });
  }

  quitGame(key: string) {
    setTimeout(() => {
      const modal = document.getElementById('confirmGameExitModal');
      if (modal) {
        if (key == 'open') {
          (modal as HTMLElement).style.display = 'flex';
          (modal as HTMLElement).style.backdropFilter = 'brightness(0.5)';
        } else if (key == 'close') {
          (modal as HTMLElement).style.display = 'none';
        } else if (key == 'exit') {
          this.router.navigate(['/application/main-menu']);
          clearAppData();
        } else if (key == 'save-and-exit') {
          this.saveGameData().then(() => {
            this.quitGame('exit');
          });
        }
      }
    });
  }

  regenerateLoadedQuestions(loadedData: any[]) {
    console.log('Loaded Data: ', loadedData);
    loadedData.map((d: any) => {
      d.isDone = d.isDone === 'true' ? true : false;
      return d;
    });

    loadedData.forEach((d: any) => {
      if (d.questionId >= 1 && d.questionId <= 10) {
        this.questions1_to_10.push(d);
      } else if (d.questionId >= 11 && d.questionId <= 20) {
        this.questions11_to_20.push(d);
      } else if (d.questionId >= 21 && d.questionId <= 30) {
        this.questions21_to_30.push(d);
      } else if (d.questionId >= 31 && d.questionId <= 40) {
        this.questions31_to_40.push(d);
      } else if (d.questionId >= 41 && d.questionId <= 50) {
        this.questions41_to_50.push(d);
      }
    });

    this.saveMergedArray();

    console.log('Q1to10: ', this.questions1_to_10);
    console.log('Q11to20: ', this.questions11_to_20);
    console.log('Q21to30: ', this.questions21_to_30);
    console.log('Q31to40: ', this.questions31_to_40);
    console.log('Q41to50: ', this.questions41_to_50);
  }

  generateQuestions(isInitialSetup?: boolean) {
    for (let i = 1; i <= 10; i++) {
      let q_config: any = {
        questionId: i,
        isDone: false,
      };
      this.questions1_to_10.push(q_config);
    }
    for (let i = 11; i <= 20; i++) {
      let q_config: any = {
        questionId: i,
        isDone: false,
      };
      this.questions11_to_20.push(q_config);
    }
    for (let i = 21; i <= 30; i++) {
      let q_config: any = {
        questionId: i,
        isDone: false,
      };
      this.questions21_to_30.push(q_config);
    }
    for (let i = 31; i <= 40; i++) {
      let q_config: any = {
        questionId: i,
        isDone: false,
      };
      this.questions31_to_40.push(q_config);
    }
    for (let i = 41; i <= 50; i++) {
      let q_config: any = {
        questionId: i,
        isDone: false,
      };
      this.questions41_to_50.push(q_config);
    }

    // if(!isInitialSetup){
    //   this.saveMergedArray();
    // }

    console.log('Q1to10: ', this.questions1_to_10);
    console.log('Q11to20: ', this.questions11_to_20);
    console.log('Q21to30: ', this.questions21_to_30);
    console.log('Q31to40: ', this.questions31_to_40);
    console.log('Q41to50: ', this.questions41_to_50);
  }

  saveMergedArray() {
    const mergedArray = [
      ...this.questions1_to_10,
      ...this.questions11_to_20,
      ...this.questions21_to_30,
      ...this.questions31_to_40,
      ...this.questions41_to_50,
    ];

    localStorage.setItem('rallyQuestions', JSON.stringify(mergedArray));
  }

  openModal(questionBox: any) {
    console.log('QBox: ', questionBox);
    this.currentQuestion = questionBox;

    this.hasCardPicked = true;

    setTimeout(() => {
      this.animateCard = true;
    }, 20);

    setTimeout(() => {
      this.hasCardPicked = false;
      this.animateCard = false;

      setTimeout(() => {
        const modal = document.getElementById('myModal');
        console.log('Modal: ', modal);
        if (modal) {
          modal.style.display = 'flex';
          modal.style.alignItems = 'center';
          modal.style.backdropFilter = 'brightness(0.5)';
        }
      });
    }, 1000);
  }

  closeModal(key?: string) {
    setTimeout(() => {
      const modal = document.getElementById('myModal');
      console.log('Modal: ', modal);
      if (modal) {
        if (key == 'cancel') {
          if (
            this.currentQuestion.questionId >= 1 &&
            this.currentQuestion.questionId <= 10
          ) {
            const cancelledItem = this.questions1_to_10.find(
              (a: any) => a.questionId == this.currentQuestion.questionId
            );
            cancelledItem.isDone = true;
          }
          if (
            this.currentQuestion.questionId >= 11 &&
            this.currentQuestion.questionId <= 20
          ) {
            const cancelledItem = this.questions11_to_20.find(
              (a: any) => a.questionId == this.currentQuestion.questionId
            );
            cancelledItem.isDone = true;
          }
          if (
            this.currentQuestion.questionId >= 21 &&
            this.currentQuestion.questionId <= 30
          ) {
            const cancelledItem = this.questions21_to_30.find(
              (a: any) => a.questionId == this.currentQuestion.questionId
            );
            cancelledItem.isDone = true;
          }
          if (
            this.currentQuestion.questionId >= 31 &&
            this.currentQuestion.questionId <= 40
          ) {
            const cancelledItem = this.questions31_to_40.find(
              (a: any) => a.questionId == this.currentQuestion.questionId
            );
            cancelledItem.isDone = true;
          }
          if (
            this.currentQuestion.questionId >= 41 &&
            this.currentQuestion.questionId <= 50
          ) {
            const cancelledItem = this.questions41_to_50.find(
              (a: any) => a.questionId == this.currentQuestion.questionId
            );
            cancelledItem.isDone = true;
          }
        } else if (key == 'done') {
        }
        modal.style.display = 'none';
      }
    });
  }

  assignPoint(key: string, data?: any) {
    setTimeout(() => {
      const addPointModal = document.getElementById('addPointModal');
      if (addPointModal) {
        if (key == 'open') {
          addPointModal.style.display = 'flex';
          addPointModal.style.backdropFilter = 'brightness(0.5)';
        } else if (key == 'submit') {
          console.log('Data: ', data);
          const winner = this.rumblerInfo.find((a: any) => a.id == data.id);
          winner.score++;
          this.allScoresAreZero = this.checkIfAllScoresAreZero();
          localStorage.setItem('rumblerInfo', JSON.stringify(this.rumblerInfo));
          this.assignPoint('close');
          this.closeModal('cancel');
        } else if (key == 'close') {
          console.log('Closing...');
          addPointModal.style.display = 'none';
        }
      }
    });
  }

  initialChecks() {
    const loadExisting = sessionStorage.getItem('loadExisting');
    const rallyQuestions = localStorage.getItem('rallyQuestions');
    console.log('loadExisting', loadExisting);
    if (!loadExisting) {
      if (rallyQuestions) {
        this.generateQuestions(true);
        this.dissminateQuestions();
      } else {
        this.questionInitialSetup('open');
      }
    } else {
      console.log('Rally Questions: ', rallyQuestions);
      if (rallyQuestions) {
        this.regenerateLoadedQuestions(JSON.parse(rallyQuestions));
      }
    }

    feather.replace();
  }

  ngAfterViewInit() {
    this.initialChecks();
  }

  dissminateQuestions() {
    const rallyQuestions = localStorage.getItem('rallyQuestions');
    if (rallyQuestions) {
      console.log('Rally Questions: ', JSON.parse(rallyQuestions));
      let q_array: any[] = JSON.parse(rallyQuestions);
      console.log('q_array: ', q_array);
      q_array.forEach((q: any) => {
        console.log('Q: ', q);
        if (q.questionId >= 1 && q.questionId <= 10) {
          this.questions1_to_10.forEach((a: any) => {
            if (a.questionId == q.questionId) {
              a.statement = q.statement;
            }
          });
        }
        if (q.questionId >= 11 && q.questionId <= 20) {
          this.questions11_to_20.forEach((a: any) => {
            if (a.questionId == q.questionId) {
              a.statement = q.statement;
            }
          });
        }
        if (q.questionId >= 21 && q.questionId <= 30) {
          this.questions21_to_30.forEach((a: any) => {
            if (a.questionId == q.questionId) {
              a.statement = q.statement;
            }
          });
        }
        if (q.questionId >= 31 && q.questionId <= 40) {
          this.questions31_to_40.forEach((a: any) => {
            if (a.questionId == q.questionId) {
              a.statement = q.statement;
            }
          });
        }
        if (q.questionId >= 41 && q.questionId <= 50) {
          this.questions41_to_50.forEach((a: any) => {
            if (a.questionId == q.questionId) {
              a.statement = q.statement;
            }
          });
        }
      });
      console.log('Q1to10: ', this.questions1_to_10);
      console.log('Q11to20: ', this.questions11_to_20);
      console.log('Q21to30: ', this.questions21_to_30);
      console.log('Q31to40: ', this.questions31_to_40);
      console.log('Q41to50: ', this.questions41_to_50);
    }
  }

  updateRallyQuestions(event: any, isInitialSetup: boolean) {
    this.uploadInProgress = true;
    this.uploadLabel = 'Uploading...';
    this.uploadRallyQuestions(event).then(() => {
      if (!isInitialSetup) {
        this.dissminateQuestions();
      }
      setTimeout(() => {
        this.uploadInProgress = false;
        this.uploadSuccessful = true;
        this.uploadLabel = 'Uploaded!';
        if (isInitialSetup) {
          this.initialChecks();
          this.questionInitialSetup('close');
        }

        setTimeout(() => {
          this.uploadSuccessful = false;
          this.uploadLabel = 'Browse File';
        }, 1500);
      }, 1500);
    });
  }

  setButtonTheme(
    selectedEl: HTMLElement,
    notSelectedEl1: HTMLElement,
    notSelectedEl2: HTMLElement,
    notSelectedEl3: HTMLElement
  ) {
    selectedEl.classList.add('active');
    notSelectedEl1.classList.remove('active');
    notSelectedEl2.classList.remove('active');
    notSelectedEl3.classList.remove('active');
  }

  setupRally(key: string) {
    feather.replace();
    setTimeout(() => {
      const setupModal = document.getElementById('setupModal');
      const uploadBtn = document.getElementById('upload-btn');
      const modifyBtn = document.getElementById('modify-btn');
      const scoringBtn = document.getElementById('scoring-btn');
      const saveBtn = document.getElementById('save-btn');
      const allBtnPresent = uploadBtn && modifyBtn && scoringBtn && saveBtn;
      if (setupModal) {
        if (key == 'open') {
          this.selectedSetupCategory = 'upload';
          setupModal.style.display = 'flex';
          setupModal.style.backdropFilter = 'brightness(0.5)';
          feather.replace();
          if (allBtnPresent) {
            feather.replace();
            this.setButtonTheme(uploadBtn, modifyBtn, scoringBtn, saveBtn);
          }
        } else if (key == 'upload') {
          this.selectedSetupCategory = key;
          if (allBtnPresent) {
            feather.replace();
            this.setButtonTheme(uploadBtn, modifyBtn, scoringBtn, saveBtn);
          }
        } else if (key == 'modify') {
          this.selectedSetupCategory = key;
          if (allBtnPresent) {
            feather.replace();
            this.setButtonTheme(modifyBtn, scoringBtn, uploadBtn, saveBtn);
          }
        } else if (key == 'scoring') {
          this.selectedSetupCategory = key;
          this.allScoresAreZero = this.checkIfAllScoresAreZero();
          if (allBtnPresent) {
            feather.replace();
            this.setButtonTheme(scoringBtn, uploadBtn, modifyBtn, saveBtn);
          }
        } else if (key == 'save') {
          this.selectedSetupCategory = key;
          this.allScoresAreZero = this.checkIfAllScoresAreZero();
          if (allBtnPresent) {
            feather.replace();
            this.setButtonTheme(saveBtn, scoringBtn, uploadBtn, modifyBtn);
          }
        } else if (key == 'close') {
          setupModal.style.display = 'none';
        }
      }
    });
  }

  checkIfAllScoresAreZero(): boolean {
    return this.rumblerInfo.filter((r: any) => r.score == 0).length == 5;
  }

  confirmScoreReset(key: string) {
    setTimeout(() => {
      const modal = document.getElementById('confirmScoreResetModal');
      if (modal) {
        if (key == 'open') {
          (modal as HTMLElement).style.display = 'flex';
          (modal as HTMLElement).style.backdropFilter = 'brightness(0.5)';
        } else if (key == 'close') {
          (modal as HTMLElement).style.display = 'none';
        }
      }
    });
  }

  controlScore(action: string, rumblerInfo?: any) {
    if (action == 'minus') {
      const rumbler = this.rumblerInfo.find((r: any) => r.id == rumblerInfo.id);
      rumbler.score--;
    } else if (action == 'plus') {
      const rumbler = this.rumblerInfo.find((r: any) => r.id == rumblerInfo.id);
      rumbler.score++;
    } else if (action == 'reset') {
      this.rumblerInfo.map((r: any) => {
        r.score = 0;
        return r;
      });
      this.confirmScoreReset('close');
    }
    this.allScoresAreZero = this.checkIfAllScoresAreZero();
    console.log('Rumbler Info: ', this.rumblerInfo);

    localStorage.setItem('rumblerInfo', JSON.stringify(this.rumblerInfo));
  }

  getQuestionSetJurisdiction(id: number): any[] {
    if (id >= 1 && id <= 10) {
      return this.questions1_to_10;
    } else if (id >= 11 && id <= 20) {
      return this.questions11_to_20;
    } else if (id >= 21 && id <= 30) {
      return this.questions21_to_30;
    } else if (id >= 31 && id <= 40) {
      return this.questions31_to_40;
    } else if (id >= 41 && id <= 50) {
      return this.questions41_to_50;
    }

    return [];
  }

  editQuestion(key: string, questionId?: number) {
    setTimeout(() => {
      const modal = document.getElementById('editQuestionModal');
      if (modal) {
        if (key == 'open') {
          if (questionId) {
            const questionSrc = this.getQuestionSetJurisdiction(questionId);
            if (questionSrc) {
              const questionObj = questionSrc.find(
                (a: any) => a.questionId == questionId
              );
              if (questionObj) {
                this.questionToEdit.id = questionObj.questionId;
                this.questionToEdit.text = questionObj.statement;
                console.log('Question To Edit: ', this.questionToEdit);
              }
            }
          }
          modal.style.display = 'flex';
          modal.style.backdropFilter = 'brightness(0.5)';
        } else if (key == 'close') {
          modal.style.display = 'none';
        } else if (key == 'submit') {
          console.log('Edited: ', this.questionToEdit.text);
          const questionSrc = this.getQuestionSetJurisdiction(
            this.questionToEdit.id
          );
          console.log('src: ', questionSrc);
          questionSrc.map((d: any) => {
            d.statement =
              d.questionId == this.questionToEdit.id
                ? this.questionToEdit.text
                : d.statement;
            return d;
          });

          this.saveEditedRallyQuestions();
        }
      }
    });
  }

  saveEditedRallyQuestions() {
    const mergedArray = [
      ...this.questions1_to_10,
      ...this.questions11_to_20,
      ...this.questions21_to_30,
      ...this.questions31_to_40,
      ...this.questions41_to_50,
    ];
    console.log('mergedArray', mergedArray);
    localStorage.setItem('rallyQuestions', JSON.stringify(mergedArray));
    this.editQuestion('close');
  }

  saveGameData(): Promise<void> {
    return new Promise((resolve, reject) => {
      const mergedArray = [
        ...this.questions1_to_10,
        ...this.questions11_to_20,
        ...this.questions21_to_30,
        ...this.questions31_to_40,
        ...this.questions41_to_50,
      ];

      const zip = new JSZip();

      const dateNow = this.datePipe.transform(new Date(), 'yyyyMMdd hhmma');

      const csv_questions = this.convertToCsv(mergedArray);
      const csv_rumblers = this.convertToCsv(this.rumblerInfo);

      zip.file(`rallyquestions_${dateNow}.csv`, csv_questions);
      zip.file(`rumblers_${dateNow}.csv`, csv_rumblers);

      zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
        saveAs(content, `rainbowrumbledata_${dateNow}.zip`);
      });

      resolve();
    });
  }
  
  rollCube() {
    const intervalTime = 1000;

    this.interval = setInterval(() => {
      const randomRotation = {
        x: Math.floor(Math.random() * 360),
        y: Math.floor(Math.random() * 360),
      };
      this.cubeStyle = {
        transform: `rotateX(${randomRotation.x}deg) rotateY(${randomRotation.y}deg)`,
      };
    }, intervalTime);
  }

  stopRolling() {
    const stopDelay = 3000;

    setTimeout(() => {
      clearInterval(this.interval);

      const randomFace =
        this.faceTransforms[
          Math.floor(Math.random() * this.faceTransforms.length)
        ];

      this.cubeStyle = {
        transform: randomFace.transform,
      };
      this.resultColor = randomFace.color;
      this.startCountdown = false;
    }, stopDelay);
  }

  startThreeSecondCountdown(): void {
    if (this.startCountdown) return;

    this.startCountdown = true;
    this.count = 3;

    const countdownInterval = setInterval(() => {
      console.log(this.count);
      this.count--;

      if (this.count === 0) {
        clearInterval(countdownInterval);
        this.count = 3;
        this.startCountdown = false;
        console.log('Countdown finished!');
      }
    }, 1000);
  }

  colorDieModal(key: string) {
    const modal = document.getElementById('colorDieModal');

    if (!modal) return;

    if (key === 'open') {
      this.rollCube();

      setTimeout(() => {
        const el = modal as HTMLElement;
        el.style.display = 'flex';
        el.style.backdropFilter = 'brightness(0.1)';

        modal.addEventListener('contextmenu', this.contextMenuHandler);
      }, 0);
    } else if (key === 'close') {
      const el = modal as HTMLElement;
      el.style.display = 'none';

      modal.removeEventListener('contextmenu', this.contextMenuHandler);
    }
  }

  colorTilesModal(key:string){
    setTimeout(() => {
      const modal = document.getElementById('colorTilesModal');
      if(modal){
        if(key == 'open'){
           modal.style.display = 'flex';
            modal.style.backdropFilter = 'brightness(0.1)';
        }else if(key == 'close'){
          modal.style.display = 'none';
        }
      }
    })
  }
}
