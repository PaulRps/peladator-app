import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'squad',
    loadChildren: () => import('./squad/squad.module').then((m) => m.SquadModule),
  },
  {
    path: 'payments',
    loadChildren: () => import('./payment/payment.module').then((m) => m.PaymentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


