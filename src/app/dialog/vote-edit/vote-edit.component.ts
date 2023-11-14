import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialsModule } from 'src/app/materials/materials.module';

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
  selector: 'app-vote-edit',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './vote-edit.component.html',
  styleUrls: ['./vote-edit.component.scss'],
})
export class VoteEditComponent {
  displayedColumns: string[] = ['voteTitle'];

  editVoteForm = new FormGroup({
    voteTitle: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VoteEditComponent>
  ) {}

  ngOnInit(): void {
    this.getFile();
  }

  getFile() {
    this.editVoteForm.patchValue(voteData[this.data]);
  }

  editVote() {
    if (this.editVoteForm.valid) {
      const formValue = this.editVoteForm.value;

      console.log(formValue);
      this.dialogRef.close();
    }
  }
}
