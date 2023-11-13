import { Route } from '@angular/router';

import { MeetingListComponent } from './meeting-list/meeting-list.component';

export const MEETING_ROUTES: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MeetingListComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
