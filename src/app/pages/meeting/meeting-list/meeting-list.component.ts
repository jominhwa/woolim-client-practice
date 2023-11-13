import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/materials/materials.module';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, MaterialsModule],
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent {}
