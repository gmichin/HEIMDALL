export class RoleModelResponse {
  _id!: string;
  role_name!: string;
  description!: string;
  __v!: number;
}

export enum RoleId {
  PROFESSOR = '65f5c07e489c8ea56ac6ff5b',
  ADM = '652ddd174bbd5905a65d8f4e',
  ALUNO = '6612fc72615a6e50440446b5',
}
