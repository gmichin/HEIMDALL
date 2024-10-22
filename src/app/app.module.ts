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
import { TelaReservasComponent } from './tela-reservas/tela-reservas.component';
import { TelaPermissaoReservasComponent } from './tela-reservas/tela-permissao-reservas/tela-permissao-reservas.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TelaSalasComponent } from './tela-salas/tela-salas.component';
import { TelaSalasFeitasComponent } from './tela-salas/tela-salas-feitas/tela-salas-feitas.component';
import { TelaNovasSalasComponent } from './tela-salas/tela-novas-salas/tela-novas-salas.component';
import { TelaSolicitacoesRegistroComponent } from './tela-solicitacoes-registro/tela-solicitacoes-registro.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TelaMapaHorarioAulasComponent } from './tela-mapa-horario-aulas/tela-mapa-horario-aulas.component';
import { TelaDisciplinasComponent } from './tela-disciplinas/tela-disciplinas.component';
import { TelaNovasDisciplinasComponent } from './tela-disciplinas/tela-novas-disciplinas/tela-novas-disciplinas.component';
import { TelaDisciplinasFeitasComponent } from './tela-disciplinas/tela-disciplinas-feitas/tela-disciplinas-feitas.component';
import { TelaSeeMoreComponent } from './tela-see-more/tela-see-more.component';
import { AnimacaoComponent } from './animacao/animacao.component';
import { TelaHomeAdmComponent } from './role-adm/tela-home-adm/tela-home-adm.component';
import { TelaHomeStudentComponent } from './role-student/tela-home-student/tela-home-student.component';
import { TelaHomeTeacherComponent } from './role-teacher/tela-home-teacher/tela-home-teacher.component';
import { TelaRegisterTeacherComponent } from './role-adm/tela-register-teacher/tela-register-teacher.component';
import { TelaEditTeacherComponent } from './role-adm/tela-edit-teacher/tela-edit-teacher.component';
import { TelaEditCourseComponent } from './role-adm/tela-edit-course/tela-edit-course.component';
import { TelaEditAdmComponent } from './role-adm/tela-edit-adm/tela-edit-adm.component';
import { TelaCreateTeacherComponent } from './role-adm/tela-create-teacher/tela-create-teacher.component';
import { TelaCreateCourseComponent } from './role-adm/tela-create-course/tela-create-course.component';
import { TelaCreateAdmComponent } from './role-adm/tela-create-adm/tela-create-adm.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    TelaLoginCadastroComponent,
    PhoneNumberDirective,
    TelaPerfilComponent,
    TelaNovasReservasComponent,
    TelaReservasFeitasComponent,
    TelaReservasComponent,
    TelaPermissaoReservasComponent,
    TelaSalasComponent,
    TelaSalasFeitasComponent,
    TelaNovasSalasComponent,
    TelaSolicitacoesRegistroComponent,
    TelaMapaHorarioAulasComponent,
    TelaDisciplinasComponent,
    TelaNovasDisciplinasComponent,
    TelaDisciplinasFeitasComponent,
    TelaSeeMoreComponent,
    AnimacaoComponent,
    TelaHomeAdmComponent,
    TelaHomeStudentComponent,
    TelaHomeTeacherComponent,
    TelaRegisterTeacherComponent,
    TelaEditTeacherComponent,
    TelaEditCourseComponent,
    TelaEditAdmComponent,
    TelaCreateTeacherComponent,
    TelaCreateCourseComponent,
    TelaCreateAdmComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

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
    MatCheckboxModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    TelaPerfilResolver,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
