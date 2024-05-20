import { Component } from '@angular/core';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';

@Component({
  selector: 'app-tela-mapa-horario-aulas',
  templateUrl: './tela-mapa-horario-aulas.component.html',
  styleUrl: './tela-mapa-horario-aulas.component.scss'
})
export class TelaMapaHorarioAulasComponent {
  public dataUser = <RegisterUserResponse>this.sessionService.getSessionData('user').retorno;

  public id = this.dataUser._id;
  public name = this.dataUser.name;
  public email = this.dataUser.email;
  public class = this.dataUser.class;

  constructor(
    private sessionService: SessionService
  ){
    console.log(this.id);
    console.log(this.name);
    console.log(this.email);
    console.log(this.class);
  }
}
