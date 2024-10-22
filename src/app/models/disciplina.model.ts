export class DisciplinaModel {
  disciplina_id?: number;
  nome!: string;
  descricao!: string;

  constructor(data: Omit<DisciplinaModel, 'disciplina_id'>) {
    this.nome = data.nome;
    this.descricao = data.descricao;
  }
}
