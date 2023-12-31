import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';

@Component({
  selector: 'app-new-tela-reserva',
  templateUrl: './new-tela-reserva.component.html',
  styleUrls: ['./new-tela-reserva.component.scss'],
})
export class NewTelaReservaComponent {
  salaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private salaDataService: SalaDataService,
    private dialogRef: MatDialogRef<NewTelaReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.salaForm = this.formBuilder.group({
      numero: [this.data ? this.data.numero : ''],
      cadeiras: [this.data ? this.data.cadeiras : '', Validators.required],
      mesas: [this.data ? this.data.mesas : '', Validators.required],
      cadeirasPorMesa: [
        this.data ? this.data.cadeirasPorMesa : '',
        Validators.required,
      ],
      computadores: [
        this.data ? this.data.computadores : '',
        Validators.required,
      ],
      lousa: [this.data ? this.data.lousa : '', Validators.required],
      projetor: [this.data ? this.data.projetor : '', Validators.required],
      status: false,
    });
  }

  salvarInformacoes() {
    const sala = this.salaForm.value;
    if (this.data) {
      this.salaDataService.atualizarSala(sala);
    } else {
      this.salaDataService.adicionarNovaSala(sala);
    }

    this.dialogRef.close({ salaEditada: true });
  }
}
