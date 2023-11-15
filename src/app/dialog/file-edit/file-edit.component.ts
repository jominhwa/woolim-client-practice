import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialsModule } from 'src/app/materials/materials.module';

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

@Component({
  selector: 'app-file-edit',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.scss'],
})
export class FileEditComponent {
  displayedColumns: string[] = ['title', 'file'];

  editFileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FileEditComponent>
  ) {}

  ngOnInit(): void {
    this.getFile();
  }

  getFile() {
    this.editFileForm.patchValue(fileData[this.data]);
  }

  editFile() {
    if (this.editFileForm.valid) {
      const formValue = this.editFileForm.value;

      console.log(formValue);
      this.dialogRef.close();
    }
  }
}
