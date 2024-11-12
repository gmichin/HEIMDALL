export class DisciplinaModel {
  disciplina_id?: number;
  nome!: string;
  descricao!: string;
  curso_id!: number;

  constructor(data: Omit<DisciplinaModel, 'disciplina_id'>) {
    this.nome = data.nome;
    this.descricao = data.descricao;
    this.curso_id = data.curso_id;
  }
}
