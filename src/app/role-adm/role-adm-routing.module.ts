import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaHomeAdmComponent } from './tela-home-adm/tela-home-adm.component';
import { telaHomeAdmResolver } from './tela-home-adm/tela-home-adm.resolver';

const adminRoutes: Routes = [
  {
    path: 'home-adm',
    component: TelaHomeAdmComponent,
    resolve: {
      dados: telaHomeAdmResolver,
    },
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class RoleAdmRoutingModule {}
