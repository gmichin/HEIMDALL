import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';

@Component({
  selector: 'app-tela-home-adm',
  templateUrl: './tela-home-adm.component.html',
  styleUrls: ['./tela-home-adm.component.scss'],
})
export class TelaHomeAdmComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit() {}

  public redirectProfile() {
    this.openDialog(TelaPerfilComponent);
  }
  openDialog(component: any): void {
    this.dialog.open(component, {
      width: '400px',
    });
  }
}
