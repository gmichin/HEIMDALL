import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { OnlyNumbersDirective } from './directives/OnlyNumbers.directive';
import { EditarModalComponent } from './tela-edicao-salas/editar-modal/editar-modal.component';
import { NovaSalaModalComponent } from './tela-edicao-salas/nova-sala-modal/nova-sala-modal.component';
import { SalaModalComponent } from './tela-edicao-salas/sala-modal/sala-modal.component';
import { TelaEdicaoSalasComponent } from './tela-edicao-salas/tela-edicao-salas.component';
import { TelaLoginCadastroComponent } from './tela-login-cadastro/tela-login-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    TelaLoginCadastroComponent,
    TelaEdicaoSalasComponent,
    SalaModalComponent,
    EditarModalComponent,
    NovaSalaModalComponent,
    OnlyNumbersDirective,
  ],
  imports: [
    AppRoutingModule,

    BrowserAnimationsModule,
    BrowserModule,

    FormsModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
