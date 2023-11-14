import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MeetingAddComponent } from 'src/app/dialog/meeting-add/meeting-add.component';
import { MatPaginator } from '@angular/material/paginator';
import { MeetingEditComponent } from 'src/app/dialog/meeting-edit/meeting-edit.component';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent {
  displayedColumns: string[] = [
    'meetingDate',
    'meetingTitle',
    'detail',
    'edit',
    'delete',
  ];

  dataSource = new MatTableDataSource<Meeting>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.getMeetingList();
  }

  getMeetingList() {
    this.dataSource = new MatTableDataSource(meetingData);
    this.dataSource.paginator = this.paginator;
  }

  addMeeting() {
    const dialogRef = this.dialog.open(MeetingAddComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getMeetingList();
    });
  }

  detailMeeting(_id: any) {
    this.router.navigate([`/meeting/${_id}`]);
  }

  editMeeting(_id: any) {
    const dialogRef = this.dialog.open(MeetingEditComponent, {
      data: _id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getMeetingList();
    });
  }

  deleteMeeting(_id: any) {
    const newArray = meetingData.filter((id) => id._id !== _id);
    meetingData = newArray;
    this.dataSource = new MatTableDataSource(newArray);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
