export class ProfessorModel {
  professor_id?: number;
  nome!: string;
  email!: string;
  senha!: string;
  registro!: string;
  adm!: boolean;
  status!: boolean;

  constructor(data: Omit<ProfessorModel, 'professor_id'>) {
    this.nome = data.nome;
    this.email = data.email;
    this.senha = data.senha;
    this.registro = data.registro;
    this.adm = data.adm;
    this.status = data.status;
  }
}

export interface IProfessoresByDisciplina {
  turmas: Array<{
    professor: ProfessorModel;
    periodo: string;
    turma_id: number;
  }>;
}
