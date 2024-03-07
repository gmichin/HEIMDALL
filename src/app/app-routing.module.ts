import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { TelaPerfilResolver } from './tela-perfil/tela-perfil.resolver';
import { TelaRedirecionarUsuarioComponent } from './tela-redirecionar-usuario/tela-redirecionar-usuario.component';
import { TelaReservasComponent } from './tela-reservas/tela-reservas.component'
import { RedirecionarUsuarioGuard } from './tela-redirecionar-usuario/tela-redirecionar-usuario.guard';
import { TelaCalendarioComponent } from './tela-calendario/tela-calendario.component';
import { TelaHorarioComponent } from './tela-horario/tela-horario.component';

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
  { path: 'tela-calendario', component: TelaCalendarioComponent },
  { path: 'tela-horario', component: TelaHorarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
