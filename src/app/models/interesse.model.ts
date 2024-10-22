export class InteresseModel {
  interesse_id?: number;
  aluno_id!: number;
  turma_id!: number;

  constructor(data: Omit<InteresseModel, 'interesse_id'>) {
    this.aluno_id = data.aluno_id;
    this.turma_id = data.turma_id;
  }
}
