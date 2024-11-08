import { InteresseService } from './../services/interesse.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { SessionService } from 'src/app/services/session.service';
import { InteresseModel } from '../models/interesse.model';
@Component({
  selector: 'app-meus-interesses',
  templateUrl: './meus-interesses.component.html',
  styleUrl: './meus-interesses.component.scss',
})
export class MeusInteressesComponent {
  displayedColumns: string[] = [
    'edit',
    'remove',
    'curso',
    'disciplina',
    'periodo',
    'professor',
  ];
  dataSource = new MatTableDataSource<InteresseModel>();
  selection = new SelectionModel<InteresseModel>(true, []);
  selectionReject = new SelectionModel<InteresseModel>(true, []);

  public dataInteresse = <InteresseModel>(
    this.sessionService.getSessionData('interesse').retorno
  );

  constructor(
    public dialog: MatDialog,
    private interesseService: InteresseService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.interesseService.getAllInteresses().subscribe({
      next: (interesses) => {
        this.dataSource.data = interesses;
      },
    });
  }

  goBack() {
    this.router.navigate(['/home-student']);
  }

  logout() {
    this.router.navigate(['/']);
  }

  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editSala() {
    this.interesseService.saveInteresseToEdit(this.selection.selected[0]);
  }

  apagarSalas() {
    const interessesSelecionadas = this.selectionReject.selected;

    if (interessesSelecionadas.length > 0) {
      this.interesseService
        .deleteInteresse(interessesSelecionadas)
        .subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (sala) => !this.selectionReject.isSelected(sala)
          );
          this.selectionReject.clear();

          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['meus-interesses']);
            });
        });
    } else {
      alert('Selecione pelo menos uma sala para excluir.');
    }
  }

  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach((row) => {
      if (!this.selectionReject.isSelected(row)) {
        this.selectionReject.select(row);
      }
    });
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }
}
