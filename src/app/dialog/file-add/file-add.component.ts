import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-add',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.scss'],
})
export class FileAddComponent {
  displayedColumns: string[] = ['fileTitle', 'file'];

  addFileForm = new FormGroup({
    fileTitle: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<FileAddComponent>) {}

  addFile() {
    if (this.addFileForm.valid) {
      const formValue = this.addFileForm.value;

      console.log(formValue);
      this.dialogRef.close();
    }
  }
}
