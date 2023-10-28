import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { TelaPerfilResolver } from './tela-perfil/tela-perfil.resolver';
import { TelaRedirecionarUsuarioComponent } from './tela-redirecionar-usuario/tela-redirecionar-usuario.component';
import { RedirecionarUsuarioGuard } from './tela-redirecionar-usuario/tela-redirecionar-usuario.guard';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
