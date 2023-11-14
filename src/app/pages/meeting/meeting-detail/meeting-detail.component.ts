import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { MatTableDataSource } from '@angular/material/table';
import { FileAddComponent } from 'src/app/dialog/file-add/file-add.component';
import { MatDialog } from '@angular/material/dialog';
import { FileEditComponent } from 'src/app/dialog/file-edit/file-edit.component';
import { VoteAddComponent } from 'src/app/dialog/vote-add/vote-add.component';
import { VoteEditComponent } from 'src/app/dialog/vote-edit/vote-edit.component';

export interface Meeting {
  _id: any;
  meetingTitle: any;
  meetingDate: any;
}

let meetingData: Meeting[] = [
  {
    _id: 0,
    meetingTitle: '13회차 주간회의',
    meetingDate: new Date('2023-11-05T10:00:00'),
  },
  {
    _id: 1,
    meetingTitle: '14회차 주간회의',
    meetingDate: new Date('2023-11-13T11:00:00'),
  },
  {
    _id: 2,
    meetingTitle: '15회차 주간회의',
    meetingDate: new Date('2023-11-15T16:00:00'),
  },
];

export interface File {
  _id: any;
  fileTitle: any;
  createdAt: any;
  file: any;
}

let fileData: File[] = [
  {
    _id: 0,
    fileTitle: '파일1',
    createdAt: new Date('2023-10-08T12:00:00'),
    file: 1,
  },
  {
    _id: 1,
    fileTitle: '파일2',
    createdAt: new Date('2023-10-15T14:00:00'),
    file: 2,
  },
  {
    _id: 2,
    fileTitle: '파일3',
    createdAt: new Date('2023-10-23T17:00:00'),
    file: 3,
  },
];

export interface Vote {
  _id: any;
  voteTitle: any;
  createdAt: any;
}

let voteData: Vote[] = [
  {
    _id: 0,
    voteTitle: '투표1',
    createdAt: new Date('2023-11-05T08:00:00'),
  },
  {
    _id: 1,
    voteTitle: '투표2',
    createdAt: new Date('2023-11-04T16:00:00'),
  },
  {
    _id: 2,
    voteTitle: '투표3',
    createdAt: new Date('2023-11-03T11:00:00'),
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
  meetingId: any;
  meetingTitle: any;
  meetingDate: any;

  fileColumns: string[] = [
    'createdAt',
    'fileTitle',
    'download',
    'edit',
    'delete',
  ];

  voteColumns: string[] = [
    'createdAt',
    'voteTitle',
    'detail',
    'edit',
    'delete',
  ];

  fileDataSource = new MatTableDataSource<File>([]);
  voteDataSource = new MatTableDataSource<Vote>([]);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.meetingId = this.route.snapshot.params['meetingId'];
  }

  ngOnInit(): void {
    this.getMeetingList();
    this.getFileList();
    this.getVoteList();
  }

  getMeetingList() {
    this.meetingTitle = meetingData[this.meetingId].meetingTitle;
    this.meetingDate = meetingData[this.meetingId].meetingDate;
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

  editFile(_id: any) {
    const dialogRef = this.dialog.open(FileEditComponent, {
      data: _id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getFileList();
    });
  }

  deleteFile(_id: any) {
    const newArray = fileData.filter((id) => id._id !== _id);
    fileData = newArray;
    this.fileDataSource = new MatTableDataSource(newArray);
  }

  getVoteList() {
    this.voteDataSource = new MatTableDataSource(voteData);
  }

  addVote() {
    const dialogRef = this.dialog.open(VoteAddComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getVoteList();
    });
  }

  editVote(_id: any) {
    const dialogRef = this.dialog.open(VoteEditComponent, {
      data: _id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getVoteList();
    });
  }

  deleteVote(_id: any) {
    const newArray = voteData.filter((id) => id._id !== _id);
    voteData = newArray;
    this.voteDataSource = new MatTableDataSource(newArray);
  }
}
