import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RegisterUserResponse } from '../models/register.models';
import { SessionService } from './../services/session.service';
import { SalaDataService } from '../services/sala-data.service';

@Component({
  selector: 'app-tela-mapa-horario-aulas',
  templateUrl: './tela-mapa-horario-aulas.component.html',
  styleUrl: './tela-mapa-horario-aulas.component.scss'
})
export class TelaMapaHorarioAulasComponent {
  public dataUser = <RegisterUserResponse>this.sessionService.getSessionData('user').retorno;

  public id = this.dataUser._id;

  constructor(
    private sessionService: SessionService,
    private salaDataService: SalaDataService,
    private datePipe: DatePipe
  ){
    console.log(this.id);
  }
}
