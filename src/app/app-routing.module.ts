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
import { ValidacaoAlunosComponent } from './validacao-alunos/validacao-alunos.component';
import { TelaMapaHorarioAulasComponent } from './tela-mapa-horario-aulas/tela-mapa-horario-aulas.component';
import { TelaDisciplinasComponent } from './tela-disciplinas/tela-disciplinas.component';
import { TelaNovasDisciplinasComponent } from './tela-disciplinas/tela-novas-disciplinas/tela-novas-disciplinas.component';
import { TelaDisciplinasFeitasComponent } from './tela-disciplinas/tela-disciplinas-feitas/tela-disciplinas-feitas.component';
import { TelaSeeMoreComponent } from './tela-see-more/tela-see-more.component';
import { AnimacaoComponent } from './animacao/animacao.component';
import { TelaRedirecionarUsuarioComponent } from './tela-redirecionar-usuario/tela-redirecionar-usuario.component';
import { RedirecionarUsuarioGuard } from './tela-redirecionar-usuario/tela-redirecionar-usuario.guard';
import { TelaHomeAdmComponent } from './role-adm/tela-home-adm/tela-home-adm.component';
import { TelaHomeTeacherComponent } from './role-teacher/tela-home-teacher/tela-home-teacher.component';
import { TelaHomeStudentComponent } from './role-student/tela-home-student/tela-home-student.component';
import { TelaSuporteAjudaComponent } from './tela-suporte-ajuda/tela-suporte-ajuda.component';
import { TelaTurmasComponent } from './tela-turmas/tela-turmas.component';
import { TelaTurmasFeitasComponent } from './tela-turmas/tela-turmas-feitas/tela-turmas-feitas.component';
import { TelaNovasTurmasComponent } from './tela-turmas/tela-novas-turmas/tela-novas-turmas.component';
import { ValidacaoProfessoresComponent } from './validacao-professores/validacao-professores.component';
import { SolicitarInteresseComponent } from './solicitar-interesse/solicitar-interesse.component';
import { ValidarInteresseComponent } from './validar-interesse/validar-interesse.component';
import { MeusInteressesComponent } from './meus-interesses/meus-interesses.component';

const routes: Routes = [
  {
    path: '',
    component: AnimacaoComponent,
  },

  { path: 'inicial', component: TelaInicialComponent },

  {
    path: 'home-adm',
    component: TelaHomeAdmComponent,
  },

  {
    path: 'home-teacher',
    component: TelaHomeTeacherComponent,
  },

  {
    path: 'home-student',
    component: TelaHomeStudentComponent,
  },
  {
    path: 'redirecionar',
    component: TelaRedirecionarUsuarioComponent,
    canActivate: [RedirecionarUsuarioGuard],
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

  { path: 'tela-disciplinas', component: TelaDisciplinasComponent },
  { path: 'tela-novas-disciplinas', component: TelaNovasDisciplinasComponent },
  {
    path: 'tela-disciplinas-feitas',
    component: TelaDisciplinasFeitasComponent,
  },

  { path: 'tela-mapa-horario-salas', component: TelaMapaHorarioAulasComponent },

  {
    path: 'validacao-alunos',
    component: ValidacaoAlunosComponent,
  },
  {
    path: 'validacao-professores',
    component: ValidacaoProfessoresComponent,
  },

  { path: 'tela-see-more', component: TelaSeeMoreComponent },

  { path: 'tela-suporte-ajuda', component: TelaSuporteAjudaComponent },

  { path: 'tela-turmas', component: TelaTurmasComponent },
  { path: 'tela-turmas-feitas', component: TelaTurmasFeitasComponent },
  { path: 'tela-novas-turmas', component: TelaNovasTurmasComponent },

  { path: 'solicitar-interesse', component: SolicitarInteresseComponent },
  { path: 'validar-interesse', component: ValidarInteresseComponent },
  { path: 'meus-interesses', component: MeusInteressesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
