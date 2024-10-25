export class CursoModel {
  curso_id?: number;
  nome!: string;
  descricao!: string;

  constructor(data: Partial<CursoModel>) {
    this.curso_id = data.curso_id;
    this.nome = data.nome!;
    this.descricao = data.descricao!;
  }
}
