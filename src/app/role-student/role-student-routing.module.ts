import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaHomeStudentComponent } from './tela-home-student/tela-home-student.component';

const studentRoutes: Routes = [
  {
    path: 'home-student',
    component: TelaHomeStudentComponent
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(studentRoutes)],
  exports: [RouterModule],
})
export class RoleStudentRoutingModule {}
