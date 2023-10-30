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
import { ReloadComponent } from './reload/reload.component';
import { RoleAdmRoutingModule } from './role-adm-routing.module';
import { TelaCreateAdmComponent } from './tela-create-adm/tela-create-adm.component';
import { TelaCreateCourseComponent } from './tela-create-course/tela-create-course.component';
import { TelaCreateTeacherComponent } from './tela-create-teacher/tela-create-teacher.component';
import { TelaEditAdmComponent } from './tela-edit-adm/tela-edit-adm.component';
import { TelaEditCourseComponent } from './tela-edit-course/tela-edit-course.component';
import { TelaEditTeacherComponent } from './tela-edit-teacher/tela-edit-teacher.component';
import { TelaHomeAdmComponent } from './tela-home-adm/tela-home-adm.component';
import { telaHomeAdmResolver } from './tela-home-adm/tela-home-adm.resolver';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    RoleAdmRoutingModule,
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
    TelaHomeAdmComponent,
    TelaCreateCourseComponent,
    TelaCreateAdmComponent,
    TelaCreateTeacherComponent,
    TelaEditCourseComponent,
    TelaEditAdmComponent,
    TelaEditTeacherComponent,
    ReloadComponent,
  ],
  providers: [telaHomeAdmResolver, TelaPerfilResolver],
})
export class RoleAdmModule {}
