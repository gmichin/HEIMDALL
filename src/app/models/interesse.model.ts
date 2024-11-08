export class InteresseModel {
  aluno_id?: number;
  turma_id: number;
  interesse_id?: number;

  constructor(data: Partial<InteresseModel> = {}) {
    this.aluno_id = data.aluno_id;
    this.turma_id = data.turma_id ?? 0;
    this.interesse_id = data.interesse_id;
  }
}
