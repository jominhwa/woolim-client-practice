import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { MatTableDataSource } from '@angular/material/table';
import { FileAddComponent } from 'src/app/dialog/file-add/file-add.component';
import { MatDialog } from '@angular/material/dialog';
import { FileEditComponent } from 'src/app/dialog/file-edit/file-edit.component';
import { VoteAddComponent } from 'src/app/dialog/vote-add/vote-add.component';
import { VoteEditComponent } from 'src/app/dialog/vote-edit/vote-edit.component';
import { VoteDetailComponent } from 'src/app/dialog/vote-detail/vote-detail.component';

export interface Meeting {
  _id: string;
  title: string;
  meetingtime: Date;
  minutes: string;
}

let meetingData: Meeting[] = [
  {
    _id: '0',
    title: '13회차 주간회의',
    meetingtime: new Date('2023-11-05T10:00:00'),
    minutes: '13회차 설명 요약입니다.',
  },
  {
    _id: '1',
    title: '14회차 주간회의',
    meetingtime: new Date('2023-11-13T11:00:00'),
    minutes: '14회차 설명 요약입니다.',
  },
  {
    _id: '2',
    title: '15회차 주간회의',
    meetingtime: new Date('2023-11-15T16:00:00'),
    minutes: '15회차 설명 요약입니다.',
  },
];

export interface File {
  _id: string;
  title: string;
  createdAt: Date;
  file: any;
}

let fileData: File[] = [
  {
    _id: '0',
    title: '파일1',
    createdAt: new Date('2023-10-08T12:00:00'),
    file: 1,
  },
  {
    _id: '1',
    title: '파일2',
    createdAt: new Date('2023-10-15T14:00:00'),
    file: 2,
  },
  {
    _id: '2',
    title: '파일3',
    createdAt: new Date('2023-10-23T17:00:00'),
    file: 3,
  },
];

export interface Vote {
  _id: string;
  title: string;
  createdAt: Date;
  result: result[];
  status: string;
  finalResult?: string;
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
  {
    _id: '1',
    title: '투표2',
    createdAt: new Date('2023-11-04T16:00:00'),
    result: [],
    status: 'Open',
  },
  {
    _id: '2',
    title: '투표3',
    createdAt: new Date('2023-11-03T11:00:00'),
    result: [],
    status: 'Pending',
  },
];

@Component({
  selector: 'app-meeting-detail',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.scss'],
})
export class MeetingDetailComponent {
  meetingId: number = 0;
  title: string = '';
  meetingtime: Date = new Date();
  minutes: string = '';

  fileColumns: string[] = ['createdAt', 'title', 'download', 'edit', 'delete'];

  voteColumns: string[] = [
    'result',
    'createdAt',
    'title',
    'detail',
    'edit',
    'delete',
  ];

  fileDataSource = new MatTableDataSource<File>([]);
  voteDataSource = new MatTableDataSource<Vote>([]);

  @ViewChild('minutesTextarea', { static: false }) minutesTextarea!: ElementRef;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.meetingId = this.route.snapshot.params['meetingId'];
  }

  ngOnInit(): void {
    this.getMeetingList();
    this.getFileList();
    this.getVoteList();
  }

  getMeetingList() {
    this.title = meetingData[this.meetingId].title;
    this.meetingtime = meetingData[this.meetingId].meetingtime;
    this.minutes = meetingData[this.meetingId].minutes;
  }

  saveMinutes() {
    this.minutes = this.minutesTextarea.nativeElement.value;
    console.log(this.minutes);
  }

  getFileList() {
    this.fileDataSource = new MatTableDataSource(fileData);
  }

  addFile() {
    const dialogRef = this.dialog.open(FileAddComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getFileList();
    });
  }

  editFile(_id: string) {
    const dialogRef = this.dialog.open(FileEditComponent, {
      data: _id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getFileList();
    });
  }

  deleteFile(_id: string) {
    const newArray = fileData.filter((id) => id._id !== _id);
    fileData = newArray;
    this.fileDataSource = new MatTableDataSource(newArray);
  }

  getVoteList() {
    this.calculateVoteResult();
    console.log(voteData);
    this.voteDataSource = new MatTableDataSource(voteData);
  }

  //   calculateVoteResult() {
  //     let supportCount = 0;
  //     let opposeCount = 0;

  //     // voteData 배열 순회
  //     for (let i = 0; i < voteData.length; i++) {
  //       // 각 voteData[i].result 배열 순회
  //       for (let j = 0; j < voteData[i].result.length; j++) {
  //         const result = voteData[i].result[j].result;
  //         console.log(result);
  //         // '찬성' 또는 '반대'에 따라 개수 증가
  //         if (result === '찬성') {
  //           supportCount++;
  //         } else if (result === '반대') {
  //           opposeCount++;
  //         }
  //       }

  //       // finalResult 속성을 추가하면서 voteData[i] 객체를 복사
  //       const updatedVoteData = {
  //         ...voteData[i],
  //         finalResult:
  //           supportCount > opposeCount
  //             ? '찬성'
  //             : supportCount < opposeCount
  //             ? '반대'
  //             : '동점',
  //       };

  //       voteData[i] = updatedVoteData;

  //       // 초기화
  //       supportCount = 0;
  //       opposeCount = 0;
  //     }
  //     return voteData;
  //   }

  calculateVoteResult() {
    voteData = voteData.map((vote) => {
      const agree = vote.result.filter(
        (result) => result.result === '찬성'
      ).length;
      const opposite = vote.result.filter(
        (result) => result.result === '반대'
      ).length;

      return {
        ...vote,
        finalResult:
          agree > opposite ? '찬성' : agree < opposite ? '반대' : '동점',
      };
    });
  }

  addVote() {
    const dialogRef = this.dialog.open(VoteAddComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getVoteList();
    });
  }

  detailVote(_id: string) {
    const dialogRef = this.dialog.open(VoteDetailComponent, {
      data: _id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getVoteList();
    });
  }

  editVote(_id: string) {
    const dialogRef = this.dialog.open(VoteEditComponent, {
      data: _id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getVoteList();
    });
  }

  deleteVote(_id: string) {
    const newArray = voteData.filter((id) => id._id !== _id);
    voteData = newArray;
    this.voteDataSource = new MatTableDataSource(newArray);
  }
}
