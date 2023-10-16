import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaEdicaoSalasComponent } from './tela-edicao-salas/tela-edicao-salas.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';

const routes: Routes = [
  { path: '', component: TelaInicialComponent },
  { path: 'edicao', component: TelaEdicaoSalasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
