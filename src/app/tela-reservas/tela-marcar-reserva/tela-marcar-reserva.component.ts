
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tela-marcar-reserva',
  templateUrl: './tela-marcar-reserva.component.html',
  styleUrls: ['./tela-marcar-reserva.component.scss']
})
export class TelaMarcarReservaComponent {

  professorForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.professorForm = this.formBuilder.group({
      nomeProfessor: ['', Validators.required],
      dataInicio: ['', Validators.required],
      horaInicio: ['', Validators.required],
      dataTermino: ['', Validators.required],
      horaTermino: ['', Validators.required],
    });
  }

  salvarInformacoes(): void {
    console.log(this.professorForm.value);
  }
}
