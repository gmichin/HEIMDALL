import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterUserResponse } from '../models/register.models';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss'],
})
export class TelaPerfilComponent implements OnInit {
  public dados = <
    {
      dataUser: RegisterUserResponse;
      roleDesc: string;
    }
  >(this.activatedRoute.snapshot.data['dados']);

  public nome = this.dados.dataUser.name;
  public role = this.dados.roleDesc;
  public email = this.dados.dataUser.email;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
}
