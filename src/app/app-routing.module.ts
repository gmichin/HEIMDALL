import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { TelaPerfilResolver } from './tela-perfil/tela-perfil.resolver';
import { TelaReservasComponent } from './tela-reservas/tela-reservas.component';
import { TelaNovasReservasComponent } from './tela-reservas/tela-novas-reservas/tela-novas-reservas.component';
import { TelaReservasFeitasComponent } from './tela-reservas/tela-reservas-feitas/tela-reservas-feitas.component';
import { TelaPermissaoReservasComponent } from './tela-reservas/tela-permissao-reservas/tela-permissao-reservas.component';
import { TelaSalasComponent } from './tela-salas/tela-salas.component';
import { TelaNovasSalasComponent } from './tela-salas/tela-novas-salas/tela-novas-salas.component';
import { TelaSalasFeitasComponent } from './tela-salas/tela-salas-feitas/tela-salas-feitas.component';
import { TelaSolicitacoesRegistroComponent } from './tela-solicitacoes-registro/tela-solicitacoes-registro.component';
import { TelaMapaHorarioAulasComponent } from './tela-mapa-horario-aulas/tela-mapa-horario-aulas.component';
import { TelaDisciplinasComponent } from './tela-disciplinas/tela-disciplinas.component';
import { TelaNovasDisciplinasComponent } from './tela-disciplinas/tela-novas-disciplinas/tela-novas-disciplinas.component';
import { TelaDisciplinasFeitasComponent } from './tela-disciplinas/tela-disciplinas-feitas/tela-disciplinas-feitas.component';
import { TelaSeeMoreComponent } from './tela-see-more/tela-see-more.component';
import { AnimacaoComponent } from './animacao/animacao.component';

const routes: Routes = [
  { path: '', component: AnimacaoComponent },

  { path: 'inicial', component: TelaInicialComponent },
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
  { path: 'tela-novas-reservas', component: TelaNovasReservasComponent },
  { path: 'tela-reservas-feitas', component: TelaReservasFeitasComponent },
  {
    path: 'tela-permissao-reservas',
    component: TelaPermissaoReservasComponent,
  },

  { path: 'tela-salas', component: TelaSalasComponent },
  { path: 'tela-novas-salas', component: TelaNovasSalasComponent },
  { path: 'tela-salas-feitas', component: TelaSalasFeitasComponent },

  { path: 'tela-materias', component: TelaDisciplinasComponent },
  { path: 'tela-novas-materias', component: TelaNovasDisciplinasComponent },
  { path: 'tela-materias-feitas', component: TelaDisciplinasFeitasComponent },

  { path: 'tela-mapa-horario-salas', component: TelaMapaHorarioAulasComponent },

  {
    path: 'tela-solicitacoes-registro',
    component: TelaSolicitacoesRegistroComponent,
  },

  { path: 'tela-see-more', component: TelaSeeMoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
