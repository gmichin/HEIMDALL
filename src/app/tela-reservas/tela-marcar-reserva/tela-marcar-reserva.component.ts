import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { SalaDataService } from 'src/app/services/sala-data.service';

@Component({
  selector: 'app-tela-marcar-reserva',
  templateUrl: './tela-marcar-reserva.component.html',
  styleUrls: ['./tela-marcar-reserva.component.scss'],
})
export class TelaMarcarReservaComponent {
  professorForm!: FormGroup;
  sala!: FormGroup;
  professorNomes: string[] = [];
  aviso: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private salaDataService: SalaDataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TelaMarcarReservaComponent>
  ) {
    this.salaDataService.teacherData$.subscribe((professores) => {
      this.professorNomes = professores.map((professor) => professor.nome);
    });
  }

  ngOnInit(): void {
    this.professorForm = this.formBuilder.group({
      nomeProfessor: ['', Validators.required],
      dataInicio: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
    });

    this.sala = this.formBuilder.group({
      numero: this.data.numero,
      cadeiras: this.data.cadeiras,
      mesas: this.data.mesas,
      cadeirasPorMesa: this.data.cadeirasPorMesa,
      computadores: this.data.computadores,
      lousa: this.data.lousa,
      projetor: this.data.projetor,
      status: true,
      data: '',
      horario: '',
      teacher: '',
    });
  }

  salvarInformacoes(form: FormGroup): void {
    if (form.invalid) {
      return;
    }

    this.sala
      .get('horario')
      ?.setValue(
        `${form.get('horaInicio')?.value} - ${form.get('horaTermino')?.value}`
      );
    this.sala
      .get('data')
      ?.setValue(moment(form.get('dataInicio')?.value).format('DD/MM/YYYY'));
    this.sala.get('teacher')?.setValue(form.get('nomeProfessor')?.value);
    const salaIndex = this.sala.value;

    this.salaDataService.atualizarSala(salaIndex);

    this.dialogRef.close();
  }
}
