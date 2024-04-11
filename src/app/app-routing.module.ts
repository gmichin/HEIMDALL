import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { TelaPerfilResolver } from './tela-perfil/tela-perfil.resolver';
import { TelaRedirecionarUsuarioComponent } from './tela-redirecionar-usuario/tela-redirecionar-usuario.component';
import { TelaReservasComponent } from './tela-reservas/tela-reservas.component'
import { RedirecionarUsuarioGuard } from './tela-redirecionar-usuario/tela-redirecionar-usuario.guard';
import { TelaNovasReservasComponent } from './tela-reservas/tela-novas-reservas/tela-novas-reservas.component';
import { TelaReservasFeitasComponent } from './tela-reservas/tela-reservas-feitas/tela-reservas-feitas.component';

const routes: Routes = [
  { path: '', component: TelaInicialComponent },
  {
    path: 'redirecionar',
    component: TelaRedirecionarUsuarioComponent,
    canActivate: [RedirecionarUsuarioGuard],
  },
  {
    path: 'home-adm',
    redirectTo: 'admin/home-adm',
  },
  {
    path: 'profile',
    component: TelaPerfilComponent,
    resolve: {
      dados: TelaPerfilResolver,
    },
  },
  { path: 'tela-reservas', component: TelaReservasComponent },
  { path: 'tela-novas-reservas', component: TelaNovasReservasComponent},
  { path: 'tela-reservas-feitas', component: TelaReservasFeitasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
