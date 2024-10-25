export class CursoModel {
  curso_id?: number;
  nome!: string;
  descricao!: string;

  constructor(data: Omit<CursoModel, 'curso_id'>) {
    this.nome = data.nome;
    this.descricao = data.descricao;
  }
}
