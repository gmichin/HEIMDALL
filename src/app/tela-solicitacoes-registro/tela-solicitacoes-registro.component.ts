import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaPerfilComponent } from '../tela-perfil/tela-perfil.component';

@Component({
  selector: 'app-tela-solicitacoes-registro',
  templateUrl: './tela-solicitacoes-registro.component.html',
  styleUrls: ['./tela-solicitacoes-registro.component.scss']
})
export class TelaSolicitacoesRegistroComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }
}
