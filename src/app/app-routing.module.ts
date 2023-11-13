import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'meeting',
        loadChildren: () =>
          import('./pages/meeting/routes').then((m) => m.MEETING_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'meeting',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
