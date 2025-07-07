import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'application',
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule)
  },
  {
    path: '',
    redirectTo: 'application/main-menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
