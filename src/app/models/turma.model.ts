export class TurmaModel {
  turma_id?: number;
  professor_id!: number;
  aluno_id!: number;
  disciplina_id!: number;
  periodo!: string;

  constructor(data: Omit<TurmaModel, 'turma_id'>) {
    this.professor_id = data.professor_id;
    this.aluno_id = data.aluno_id;
    this.disciplina_id = data.disciplina_id;
    this.periodo = data.periodo;
  }
}
