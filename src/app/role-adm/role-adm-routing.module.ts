import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaHomeAdmComponent } from './tela-home-adm/tela-home-adm.component';

const adminRoutes: Routes = [
  {
    path: 'home-adm',
    component: TelaHomeAdmComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class RoleAdmRoutingModule {}
