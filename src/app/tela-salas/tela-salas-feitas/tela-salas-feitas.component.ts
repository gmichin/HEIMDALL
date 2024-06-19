import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalaDataService } from 'src/app/services/sala-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table'; 
import { Router } from '@angular/router';
import { TelaLoginCadastroComponent } from 'src/app/tela-login-cadastro/tela-login-cadastro.component';
import { TelaSalasComponent } from 'src/app/tela-salas/tela-salas.component';
import { TelaReservasComponent } from 'src/app/tela-reservas/tela-reservas.component';
import { SelectionModel } from '@angular/cdk/collections';
import { RoomsModel } from 'src/app/models/rooms.model';
import { RoomService } from 'src/app/services/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReloadService } from 'src/app/services/reload.service';
import { TelaPerfilComponent } from 'src/app/tela-perfil/tela-perfil.component';
import { TelaMateriasComponent } from 'src/app/tela-materias/tela-materias.component';


interface Sala {
  number: number;
  cadeiras: number;
  mesas: number;
  cadeirasPorMesa: number;
  computadores: number;
  capacidade: number;
  projetor: number;
  status : string;
}

@Component({
  selector: 'app-tela-salas-feitas',
  templateUrl: './tela-salas-feitas.component.html',
  styleUrls: ['./tela-salas-feitas.component.scss']
})
export class TelaSalasFeitasComponent {
  displayedColumns: string[] = ['remove','edit','numero', 'cadeiras', 'mesas', 'cadeirasPorMesa', 'computadores', 'lousa', 'projetor', 'status'];
  dataSource = new MatTableDataSource<RoomsModel>();
  selection = new SelectionModel<RoomsModel>(true, []);
  selectionReject = new SelectionModel<RoomsModel>(true, []);



  constructor(
    public dialog: MatDialog,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private reloadService: ReloadService,
    private router: Router,
    private reload: ReloadService
  ) {
    this.roomService.getRoomsByInst().subscribe({
      next: salas => {
        this.dataSource.data = salas;
      }
    });
  }

  goBack(){
    this.router.navigate(['/home-adm']);
  }
  logout(){
    this.router.navigate(['/']);
  }

  public redirectMaterias() {
    const dialogT = this.dialog.open(TelaMateriasComponent, {
      width: '400px',
    });
  }

  public redirectHomeAdm() {
    this.reload.reoladPage(['redirecionar'])
  }
  
  public redirectProfile() {
    const dialogT = this.dialog.open(TelaPerfilComponent, {
      width: '400px',
    });
    dialogT.afterClosed().subscribe(() => {
      this.dialogCloseSubs();
    });
  }
  
  private dialogCloseSubs() {
    this.reload.reoladPage(['redirecionar']);
  }
  openLoginSignUp() {
    const dialogRef = this.dialog.open(TelaLoginCadastroComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openReservas() {
    const dialogRef = this.dialog.open(TelaReservasComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSalas() {
    const dialogRef = this.dialog.open(TelaSalasComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatTable)
  table!: MatTable<Sala>;

  editSala() {
    this.roomService.saveRoomToEdit(this.selection.selected[0]);
  }

  apagarSalas() {
    this.roomService.deleteRoom(this.selectionReject.selected).subscribe({
      next: res => {
        this.snackBar.open('Removida(s) com sucesso!', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-salas-feitas']);
      },
      error: err => {
        this.snackBar.open('Ocorreu um erro durante a solicitação, por favor, tente novamente mais tarde.', '', {
          duration: 4000,
        });
        this.reloadService.reoladPage(['tela-salas-feitas']);
      }
    })
  }

  toggleAllRowsReject() {
    if (this.isAllRejectSelected()) {
      this.selectionReject.clear();
      return;
    }
    this.dataSource.data.forEach(row => {
      if(!this.selectionReject.isSelected(row)){
        this.selectionReject.select(row);
      }
    })
  }

  isAllRejectSelected() {
    return this.selectionReject.selected.length > 0;
  }
}
