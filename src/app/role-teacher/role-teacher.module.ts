import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TelaPerfilResolver } from '../tela-perfil/tela-perfil.resolver';
import { RoleTeacherRoutingModule } from './role-teacher-routing.module';
import { TelaHomeTeacherComponent } from './tela-home-teacher/tela-home-teacher.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    RoleTeacherRoutingModule,
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
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    TelaHomeTeacherComponent
  ],
  providers: [TelaPerfilResolver],
})
export class RoleTeacherModule {}
