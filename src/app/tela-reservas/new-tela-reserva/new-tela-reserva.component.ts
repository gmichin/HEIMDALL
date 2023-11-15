import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-tela-reserva',
  templateUrl: './new-tela-reserva.component.html',
  styleUrls: ['./new-tela-reserva.component.scss']
})
export class NewTelaReservaComponent {
  salaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private salaDataService: SalaDataService,
    private dialogRef: MatDialogRef<NewTelaReservaComponent>
  ) { }

  ngOnInit(): void {
    this.salaForm = this.formBuilder.group({
      numero: ['', Validators.required],
      cadeiras: ['', Validators.required],
      mesas: ['', Validators.required],
      cadeirasMesa: ['', Validators.required],
      computadores: ['', Validators.required],
      lousa: ['', Validators.required],
      projetor: ['', Validators.required],
    });
  }

  salvarInformacoes() {
    const novaSala = this.salaForm.value;
    this.salaDataService.adicionarNovaSala(novaSala);
    this.dialogRef.close();
  }
}
