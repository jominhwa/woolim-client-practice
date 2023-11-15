import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vote-add',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './vote-add.component.html',
  styleUrls: ['./vote-add.component.scss'],
})
export class VoteAddComponent {
  displayedColumns: string[] = ['title'];

  addVoteForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<VoteAddComponent>) {}

  addVote() {
    if (this.addVoteForm.valid) {
      const formValue = this.addVoteForm.value;

      console.log(formValue);
      this.dialogRef.close();
    }
  }
}
