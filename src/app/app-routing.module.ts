import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { TelaLoginCadastroComponent } from './tela-login-cadastro/tela-login-cadastro.component';

const routes: Routes = [
  { path: '', component: TelaLoginCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
