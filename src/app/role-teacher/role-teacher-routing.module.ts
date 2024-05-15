import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaHomeTeacherComponent } from './tela-home-teacher/tela-home-teacher.component';

const teacherRoutes: Routes = [
  {
    path: 'home-teacher',
    component: TelaHomeTeacherComponent
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(teacherRoutes)],
  exports: [RouterModule],
})
export class RoleTeacherRoutingModule {}
