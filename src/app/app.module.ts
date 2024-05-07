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

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { PhoneNumberDirective } from './directives/OnlyNumbers.directive';
import { LoaderComponent } from './loader/loader.component';
import { RoleAdmModule } from './role-adm/role-adm.module';
import { LoaderService } from './services/loader.service';
import { RegisterUserService } from './services/register-user.service';
import { TelaLoginCadastroComponent } from './tela-login-cadastro/tela-login-cadastro.component';
import { TelaPerfilComponent } from './tela-perfil/tela-perfil.component';
import { TelaPerfilResolver } from './tela-perfil/tela-perfil.resolver';
import { TelaNovasReservasComponent } from './tela-reservas/tela-novas-reservas/tela-novas-reservas.component';
import { TelaReservasFeitasComponent } from './tela-reservas/tela-reservas-feitas/tela-reservas-feitas.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { TelaReservasComponent } from './tela-reservas/tela-reservas.component'
import { TelaDeletarReservasComponent } from './tela-reservas/tela-deletar-reservas/tela-deletar-reservas.component'
import { TelaPermissaoReservasComponent } from './tela-reservas/tela-permissao-reservas/tela-permissao-reservas.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TelaSalasComponent } from './tela-salas/tela-salas.component'
import { TelaDeletarSalasComponent } from './tela-salas/tela-deletar-salas/tela-deletar-salas.component';
import { TelaPermissaoSalasComponent } from './tela-salas/tela-permissao-salas/tela-permissao-salas.component';
import { TelaSalasFeitasComponent } from './tela-salas/tela-salas-feitas/tela-salas-feitas.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    TelaLoginCadastroComponent,
    PhoneNumberDirective,
    TelaPerfilComponent,
    LoaderComponent,
    TelaNovasReservasComponent,
    TelaReservasFeitasComponent,
    TelaReservasComponent,
    TelaDeletarReservasComponent,
    TelaPermissaoReservasComponent,
    TelaSalasComponent,
    TelaDeletarSalasComponent,
    TelaPermissaoSalasComponent,
    TelaSalasFeitasComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoleAdmModule,

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
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTableModule,
    MatCheckboxModule
    
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }, 
    RegisterUserService,
    LoaderService, 
    TelaPerfilResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
