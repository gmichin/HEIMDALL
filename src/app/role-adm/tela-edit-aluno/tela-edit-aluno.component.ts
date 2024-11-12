import { AlunoService } from 'src/app/services/aluno.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlunoModel } from 'src/app/models/aluno.model';

@Component({
  selector: 'app-tela-edit-aluno',
  templateUrl: './tela-edit-aluno.component.html',
  styleUrls: ['./tela-edit-aluno.component.scss'],
})
export class TelaEditAlunoComponent implements OnInit {
  public cadastroAlunoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private alunoService: AlunoService,
    public dialogRef: MatDialogRef<TelaEditAlunoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlunoModel
  ) {
    this.cadastroAlunoForm = this.fb.group(
      {
        nome: [data.nome || '', [Validators.required]],
        email: [data.email || '', [Validators.required, this.emailValidator]],
        registro: [data.registro || '', [Validators.required]],
        ano_entrada: [data.ano_entrada || '', [Validators.required]],
        status: [[true]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}

  edit() {
    if (this.cadastroAlunoForm.invalid) {
      console.log(this.cadastroAlunoForm.invalid);
      return;
    }

    (this.data.nome = this.cadastroAlunoForm.get('nome')?.value),
      (this.data.email = this.cadastroAlunoForm.get('email')?.value),
      (this.data.registro = this.cadastroAlunoForm.get('registro')?.value),
      (this.data.ano_entrada =
        this.cadastroAlunoForm.get('ano_entrada')?.value),
      (this.data.status = true);

    this.alunoService.atualizarAluno(this.data).subscribe({
      next: () => {
        this.snackBar.open('Dados atualizados com sucesso.', '', {
          duration: 3000,
        });
        this.dialogRef.close();
        this.resetForms(this.cadastroAlunoForm);
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['home-adm']);
          });
      },
      error: (err) => {
        this.snackBar.open('Ocorreu um erro durante sua solicitação.', '', {
          duration: 3000,
        });
        this.dialogRef.close();
      },
    });

    this.router.navigate(['home-adm']);
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
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
