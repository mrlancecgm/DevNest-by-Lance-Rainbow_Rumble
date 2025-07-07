import {
  Component,
  OnInit,
  setTestabilityGetter,
  ViewEncapsulation,
} from '@angular/core';

import { uploadRallyQuestions } from '../../../shared/functions/functions';

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

  public uploadRallyQuestions = uploadRallyQuestions;

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

  public rainbowRumbleLogo: string =
    'assets/logo/rainbow-rumble-transparent.png';
  public uploadIcon: string = 'assets/icons/upload_white.png';

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

  constructor() {}

  ngOnInit(): void {
    const rumblerInfo = localStorage.getItem('rumblerInfo');
    if (rumblerInfo) {
      this.rumblerInfo = JSON.parse(rumblerInfo);
    }

    this.generateQuestions();
  }

  generateQuestions() {
    for (let i = 1; i <= 10; i++) {
      let q_config: any = {
        questionId: i,
        statement: null,
        isDone: false,
      };
      this.questions1_to_10.push(q_config);
    }
    for (let i = 11; i <= 20; i++) {
      let q_config: any = {
        questionId: i,
        statement: null,
        isDone: false,
      };
      this.questions11_to_20.push(q_config);
    }
    for (let i = 21; i <= 30; i++) {
      let q_config: any = {
        questionId: i,
        statement: null,
        isDone: false,
      };
      this.questions21_to_30.push(q_config);
    }
    for (let i = 31; i <= 40; i++) {
      let q_config: any = {
        questionId: i,
        statement: null,
        isDone: false,
      };
      this.questions31_to_40.push(q_config);
    }
    for (let i = 41; i <= 50; i++) {
      let q_config: any = {
        questionId: i,
        statement: null,
        isDone: false,
      };
      this.questions41_to_50.push(q_config);
    }

    console.log('Q1to10: ', this.questions1_to_10);
    console.log('Q11to20: ', this.questions11_to_20);
    console.log('Q21to30: ', this.questions21_to_30);
    console.log('Q31to40: ', this.questions31_to_40);
    console.log('Q41to50: ', this.questions41_to_50);
  }

  openModal(questionBox: any) {
    console.log('QBox: ', questionBox);
    this.currentQuestion = questionBox;
    setTimeout(() => {
      const modal = document.getElementById('myModal');
      console.log('Modal: ', modal);
      if (modal) {
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.backdropFilter = 'brightness(0.5)';
        // modal.style.backdropFilter = 'brightness(0.5)';
        // modal.setAttribute('style', 'display:block;backdrop-filter:brightness(0.5)');
      }
    });
  }

  closeModal() {
    setTimeout(() => {
      const modal = document.getElementById('myModal');
      console.log('Modal: ', modal);
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }

  ngAfterViewInit() {
    this.dissminateQuestions();
  }

  dissminateQuestions() {
    const rallyQuestions = localStorage.getItem('rallyQuestions');
    if (rallyQuestions) {
      console.log('Rally Questions: ', JSON.parse(rallyQuestions));
      let q_array: any[] = JSON.parse(rallyQuestions);
      q_array.forEach((q: any) => {
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

  updateRallyQuestions(event: any) {
  this.uploadRallyQuestions(event).then(() => {
    this.dissminateQuestions();
  });
}
}
