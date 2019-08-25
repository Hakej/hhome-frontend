import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogOverviewExampleDialogComponent } from './components/dialog/dialog-overview-example-dialog/dialog-overview-example-dialog.component';

const routes: Routes = [
  {
    path: 'dialog',
    component: DialogOverviewExampleDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
