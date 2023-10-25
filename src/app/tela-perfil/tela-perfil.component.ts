import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss'],
})
export class TelaPerfilComponent implements OnInit {
  public nome = 'Érico Vinícius C. Lima';
  public role = 'Administrador';
  public email = 'erico@gmail.com';

  constructor() {}

  ngOnInit() {}
}
