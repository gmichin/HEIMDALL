export class AlunoModel {
  aluno_id?: number;
  nome!: string;
  email!: string;
  senha!: string;
  registro!: string;
  ano_entrada!: Date;

  constructor(data: Omit<AlunoModel, 'aluno_id'>) {
    this.nome = data.nome;
    this.email = data.email;
    this.senha = data.senha;
    this.registro = data.registro;
    this.ano_entrada = data.ano_entrada;
  }
}
