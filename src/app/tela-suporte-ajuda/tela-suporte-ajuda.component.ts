import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelaLoginCadastroComponent } from '../tela-login-cadastro/tela-login-cadastro.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginUserService } from '../services/login.service';
@Component({
  selector: 'app-tela-suporte-ajuda',
  templateUrl: './tela-suporte-ajuda.component.html',
  styleUrl: './tela-suporte-ajuda.component.scss',
})
export class TelaSuporteAjudaComponent implements OnInit {

  public supForm!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private suporteService: LoginUserService
  ) {
    this.supForm = this.fb.group(
      {
        nome: ['', Validators.required],
        email: ['', [Validators.required, this.emailValidator]],
        descricao: ['', Validators.required],
      }
    );
    sessionStorage.clear();
  }
  ngOnInit(): void {

  }

  private emailValidator(control: any) {
    const value = control.value;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (value && !pattern.test(value)) {
      return { email: true };
    }
    return null;
  }

  public send() {
    if (this.supForm.invalid) {
      this.snackBar.open(`Algum campo sem preenchimento, revise os campos.`, '', {
        duration: 5000,
      });
      return;
    }
    this.suporteService.sendSuporte(this.supForm.value).subscribe({
      next: res =>{ 
        this.snackBar.open(`Enviado com sucesso.`, '', {
          duration: 5000,
        });
        
        this.router.navigate(['inicial']);},
      error: err => {
        this.snackBar.open(`Ocorreu um erro durante sua solicitação, por favor tente novamente mais tarde.`, '', {
          duration: 5000,
        });
        this.router.navigate(['inicial']);      }
    })

  }


  openLoginSignUp() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  goBack() {
    this.router.navigate(['inicial']);
  }
}
