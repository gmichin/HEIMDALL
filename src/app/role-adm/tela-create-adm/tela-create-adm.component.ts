import { CadastroService } from './../../services/cadastros.service';
import { ProfessorModel } from './../../models/professor.model';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from './../../services/session.service';

@Component({
  selector: 'app-tela-create-adm',
  templateUrl: './tela-create-adm.component.html',
  styleUrls: ['./tela-create-adm.component.scss'],
})
export class TelaCreateAdmComponent implements OnInit {
  public cadastroProfessorAdmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cadastroService: CadastroService,
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<TelaCreateAdmComponent>
  ) {
    this.cadastroProfessorAdmForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, this.emailValidator]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]],
        registro: ['', [Validators.required]],
        adm: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}
  register() {
    if (this.cadastroProfessorAdmForm.invalid) {
      return;
    }
    const request = new ProfessorModel({
      nome: this.cadastroProfessorAdmForm.get('nome')?.value,
      email: this.cadastroProfessorAdmForm.get('email')?.value,
      senha: this.cadastroProfessorAdmForm.get('senha')?.value,
      registro: this.cadastroProfessorAdmForm.get('registro')?.value,
      adm: this.cadastroProfessorAdmForm.get('adm')?.value,
    });

    this.cadastroService.cadastro(request).subscribe({
      next: (res) => {
        if (res instanceof ProfessorModel) {
          // Verifica se o retorno é ProfessorModel
          let adms =
            this.sessionService.getSessionData<ProfessorModel[]>(
              'adms'
            ).retorno;
          if (!adms) {
            adms = [];
          }
          adms.push(res);
          this.sessionService.setItem('adms', adms);

          this.snackBar.open(`Cadastrado com sucesso.`, '', {
            duration: 1000,
          });
          this.resetForms(this.cadastroProfessorAdmForm);
          this.dialogRef.close();
        } else {
          this.snackBar.open(`O retorno não é do tipo esperado.`, '', {
            duration: 1000,
          });
        }
      },
      error: (err) => {
        this.snackBar.open(`Ocorreu um erro durante sua solicitação.`, '', {
          duration: 1000,
        });
      },
    });
  }

  private resetForms(form: FormGroup): void {
    form.reset();

    Object.keys(form.controls).forEach((controlName) => {
      const control = form.get(controlName);
      control?.setErrors(null);
      control?.markAsUntouched();
    });
  }

  private emailValidator(control: any) {
    const value = control.value;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (value && !pattern.test(value)) {
      return { email: true };
    }
    return null;
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('senha'); // Corrigir o campo para 'senha'
    const confirmPassword = control.get('confirmarSenha'); // Corrigir o campo para 'confirmarSenha'

    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
