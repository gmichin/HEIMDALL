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
import { TelaDeletarReservasComponent } from './tela-reservas/tela-deletar-reservas/tela-deletar-reservas.component';
import { TelaPermissaoReservasComponent } from './tela-reservas/tela-permissao-reservas/tela-permissao-reservas.component';
import { TelaSalasComponent } from './tela-salas/tela-salas.component';
import { TelaNovasSalasComponent } from './tela-salas/tela-novas-salas/tela-novas-salas.component';
import { TelaSalasFeitasComponent } from './tela-salas/tela-salas-feitas/tela-salas-feitas.component';
import { TelaSolicitacoesRegistroComponent } from './tela-solicitacoes-registro/tela-solicitacoes-registro.component';
import { TelaSolicitacoesRegistroResolver } from './tela-solicitacoes-registro/tela-solicitacoes-registro.resolver';
import { ReloadComponent } from './reload/reload.component';
import { TelaMapaHorarioAulasComponent } from './tela-mapa-horario-aulas/tela-mapa-horario-aulas.component';
import { TelaMateriasComponent } from './tela-materias/tela-materias.component';
import { TelaNovasMateriasComponent } from './tela-materias/tela-novas-materias/tela-novas-materias.component';
import { TelaMateriasFeitasComponent } from './tela-materias/tela-materias-feitas/tela-materias-feitas.component';

const routes: Routes = [
  { path: '', component: TelaInicialComponent },
  {
    path: 'reload',
    component: ReloadComponent,
  },
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
    path: 'home-teacher',
    redirectTo: 'teacher/home-teacher',
  },
  {
    path: 'home-student',
    redirectTo: 'student/home-student',
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
  { path: 'tela-deletar-reservas', component: TelaDeletarReservasComponent},
  { path: 'tela-permissao-reservas', component: TelaPermissaoReservasComponent},

  { path: 'tela-salas', component: TelaSalasComponent },
  { path: 'tela-novas-salas', component: TelaNovasSalasComponent},
  { path: 'tela-salas-feitas', component: TelaSalasFeitasComponent},
  
  { path: 'tela-materias', component: TelaMateriasComponent },
  { path: 'tela-novas-materias', component: TelaNovasMateriasComponent},
  { path: 'tela-materias-feitas', component: TelaMateriasFeitasComponent},

  { path: 'tela-mapa-horario-salas', component: TelaMapaHorarioAulasComponent},


  { path: 'tela-solicitacoes-registro', component: TelaSolicitacoesRegistroComponent, resolve:{dados:TelaSolicitacoesRegistroResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
