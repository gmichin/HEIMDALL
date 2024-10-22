export class CursoModel {
  curso_id?: number;
  disciplina_id!: number;
  nome!: string;
  descricao!: string;

  constructor(data: Omit<CursoModel, 'curso_id'>) {
    this.disciplina_id = data.disciplina_id;
    this.nome = data.nome;
    this.descricao = data.descricao;
  }
}
