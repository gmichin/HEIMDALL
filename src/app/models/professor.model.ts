export class ProfessorModel {
  professor_id!: number;
  nome!: string;
  email!: string;
  senha!: string;
  registro!: string;
  adm!: boolean;

  constructor(
    data: /* Omit< */ Required<ProfessorModel> /* , 'professor_id'> */
  ) {
    this.professor_id = data.professor_id;
    this.nome = data.nome;
    this.email = data.email;
    this.senha = data.senha;
    this.registro = data.registro;
    this.adm = data.adm;
  }
}
