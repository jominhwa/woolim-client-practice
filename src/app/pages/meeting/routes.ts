import { Route } from '@angular/router';

import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingDetailComponent } from './meeting-detail/meeting-detail.component';

export const MEETING_ROUTES: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MeetingListComponent,
      },
      {
        path: ':meetingId',
        component: MeetingDetailComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
