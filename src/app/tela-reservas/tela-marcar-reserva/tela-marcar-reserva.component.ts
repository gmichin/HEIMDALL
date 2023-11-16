import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tela-marcar-reserva',
  templateUrl: './tela-marcar-reserva.component.html',
  styleUrls: ['./tela-marcar-reserva.component.scss']
})
export class TelaMarcarReservaComponent {

  professorForm!: FormGroup;
  sala!: FormGroup;
  professorNomes: string[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private salaDataService: SalaDataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TelaMarcarReservaComponent>
    ) {
    this.salaDataService.teacherData$.subscribe(professores => {
      this.professorNomes = professores.map(professor => professor.nome);
    });

    }

  ngOnInit(): void {
    this.professorForm = this.formBuilder.group({
      nomeProfessor: ['', Validators.required],
      dataInicio: ['', Validators.required],
      horaInicio: ['', Validators.required],
      dataTermino: ['', Validators.required],
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
      status: true
    });
  }

  salvarInformacoes(): void {
    const salaIndex = this.sala.value;
    
    this.salaDataService.atualizarSala(salaIndex);

    console.log(this.professorForm.value);

    this.dialogRef.close();
  }
}
