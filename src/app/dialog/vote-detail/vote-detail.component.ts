import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Vote {
  _id: any;
  voteTitle: any;
  createdAt: any;
  result: result[];
  status: string;
}

interface result {
  user_id: string;
  name: string;
  result: string;
  votingtime: Date | string;
}

let voteData: Vote[] = [
  {
    _id: 0,
    voteTitle: '투표1',
    createdAt: new Date('2023-11-05T18:00:00'),
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
    status: 'Close',
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
  voteTitle: string = '';
  voteResultLength: number = 0;
  agree: number = 0;
  agreeArray: string[] = [];
  opposite: number = 0;
  oppositeArray: string[] = [];
  abstention: number = 0;
  abstentionArray: string[] = [];
  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VoteDetailComponent>
  ) {}

  ngOnInit(): void {
    this.getVoteResult();
  }

  getVoteResult() {
    this.voteTitle = voteData[this.data].voteTitle;
    this.voteResultLength = voteData[this.data].result.length;

    voteData[this.data].result.forEach((result, i) => {
      if (voteData[this.data].result[i].result === '찬성') {
        this.agree += 1;
        this.agreeArray.push(voteData[this.data].result[i].name);
      } else if (voteData[this.data].result[i].result === '반대') {
        this.opposite += 1;
        this.oppositeArray.push(voteData[this.data].result[i].name);
      } else if (voteData[this.data].result[i].result === '기권') {
        this.abstention += 1;
        this.abstentionArray.push(voteData[this.data].result[i].name);
      }
    });

    function determineVote(a: number, b: number, c: number) {
      if (a > b) {
        return '찬성';
      } else if (b > a) {
        return '반대';
      } else {
        return '동점';
      }
    }

    this.result = determineVote(this.agree, this.opposite, this.abstention);
  }
}
