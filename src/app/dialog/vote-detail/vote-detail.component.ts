import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Vote {
  _id: string;
  title: string;
  createdAt: Date;
  result: result[];
  status: string;
}

interface result {
  user_id: string;
  name: string;
  result: string;
  votingtime: Date;
}

let voteData: Vote[] = [
  {
    _id: '0',
    title: '투표1',
    createdAt: new Date('2023-11-05T08:00:00'),
    result: [
      {
        user_id: '0',
        name: '조민화',
        result: '찬성',
        votingtime: new Date('2023-11-05T18:00:00'),
      },
      {
        user_id: '1',
        name: '홍진호',
        result: '반대',
        votingtime: new Date('2023-11-05T18:10:00'),
      },
    ],
    status: 'Closed',
  },
];

@Component({
  selector: 'app-vote-detail',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.scss'],
})
export class VoteDetailComponent {
  title: string = '';
  voteResultLength: number = 0;
  agree: number = 0;
  agreeArray: string[] = [];
  opposite: number = 0;
  oppositeArray: string[] = [];
  abstention: number = 0;
  abstentionArray: string[] = [];
  finalResult: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VoteDetailComponent>
  ) {}

  ngOnInit(): void {
    this.getVoteResult();
  }

  //   getVoteResult() {
  //     this.title = voteData[this.data].title;
  //     this.voteResultLength = voteData[this.data].result.length;

  //     voteData[this.data].result.forEach((result, i) => {
  //       if (voteData[this.data].result[i].result === '찬성') {
  //         this.agree += 1;
  //         this.agreeArray.push(voteData[this.data].result[i].name);
  //       } else if (voteData[this.data].result[i].result === '반대') {
  //         this.opposite += 1;
  //         this.oppositeArray.push(voteData[this.data].result[i].name);
  //       } else if (voteData[this.data].result[i].result === '기권') {
  //         this.abstention += 1;
  //         this.abstentionArray.push(voteData[this.data].result[i].name);
  //       }
  //     });

  //     function determineVote(a: number, b: number, c: number) {
  //       if (a > b) {
  //         return '찬성';
  //       } else if (b > a) {
  //         return '반대';
  //       } else {
  //         return '동점';
  //       }
  //     }

  //     this.finalResult = determineVote(
  //       this.agree,
  //       this.opposite,
  //       this.abstention
  //     );
  //   }

  //   getVoteResult() {
  //     this.title = voteData[this.data].title;
  //     const voteResult = voteData[this.data].result;
  //     this.voteResultLength = voteResult.length;

  //     voteResult.forEach((result) => {
  //       const { name, result: voteResult } = result;

  //       switch (voteResult) {
  //         case '찬성':
  //           this.agree += 1;
  //           this.agreeArray.push(name);
  //           break;
  //         case '반대':
  //           this.opposite += 1;
  //           this.oppositeArray.push(name);
  //           break;
  //         case '기권':
  //           this.abstention += 1;
  //           this.abstentionArray.push(name);
  //           break;
  //       }
  //     });

  //     this.finalResult = this.determineVote(
  //       this.agree,
  //       this.opposite,
  //       this.abstention
  //     );
  //   }

  //   determineVote(a: number, b: number, c: number) {
  //     return a > b ? '찬성' : b > a ? '반대' : '동점';
  //   }

  getVoteResult() {
    this.title = voteData[this.data].title;
    const voteResult = voteData[this.data].result;
    this.voteResultLength = voteResult.length;

    voteResult.forEach((result) => {
      const { name, result: voteResult } = result;

      switch (voteResult) {
        case '찬성':
          this.agree += 1;
          this.agreeArray.push(name);
          break;
        case '반대':
          this.opposite += 1;
          this.oppositeArray.push(name);
          break;
        case '기권':
          this.abstention += 1;
          this.abstentionArray.push(name);
          break;
      }
    });

    this.finalResult =
      this.agree > this.opposite
        ? '찬성'
        : this.opposite > this.agree
        ? '반대'
        : '동점';
  }
}
